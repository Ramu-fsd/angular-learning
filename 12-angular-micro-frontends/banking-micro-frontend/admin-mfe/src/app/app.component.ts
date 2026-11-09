import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

type AccessStatus = 'Pending' | 'Approved' | 'Rejected';
interface AccessRequest {
  id: string;
  requester: string;
  role: string;
  system: string;
  submitted: string;
  status: AccessStatus;
}
interface AdminUser {
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Suspended';
  lastLogin: string;
}
interface AuditEvent {
  time: string;
  actor: string;
  action: string;
  target: string;
  result: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="shell">
      <aside class="sidebar">
        <div class="brand"><div class="brand-mark">N</div><div><strong>Northstar</strong><small>Banking Platform</small></div></div>
        <div class="nav-label">ADMINISTRATION</div>
        <button class="nav-item active"><span>▦</span> Overview</button>
        <button class="nav-item" (click)="setSection('users')"><span>♙</span> Users & roles</button>
        <button class="nav-item" (click)="setSection('requests')"><span>⇧</span> Access requests <b class="nav-count">{{ pendingCount() }}</b></button>
        <button class="nav-item" (click)="setSection('audit')"><span>≡</span> Audit trail</button>
        <button class="nav-item" (click)="setSection('features')"><span>⚙</span> Platform settings</button>
        <div class="sidebar-bottom"><div class="avatar">AB</div><div><strong>Alex Brooks</strong><small>Platform Administrator</small></div></div>
      </aside>

      <main class="main">
        <header class="topbar">
          <div class="crumb">Platform / <strong>Administration</strong></div>
          <div class="top-actions"><span class="environment"><i></i> UAT ENVIRONMENT</span><span class="top-avatar">AB</span></div>
        </header>

        <section class="content">
          <div class="page-heading">
            <div><div class="eyebrow">PLATFORM CONTROL CENTER</div><h1>Administration overview</h1><p>Manage platform access, governance and operational controls.</p></div>
            <button class="primary" (click)="showNewRequestInfo()">＋ Create access request</button>
          </div>

          <div class="metrics">
            <article class="metric"><div class="metric-top"><span>Total users</span><span class="metric-icon blue">♙</span></div><strong>1,284</strong><small><em>+4.8%</em> vs last month</small></article>
            <article class="metric"><div class="metric-top"><span>Active users</span><span class="metric-icon green">✓</span></div><strong>1,246</strong><small>97.0% of all users</small></article>
            <article class="metric"><div class="metric-top"><span>Pending approvals</span><span class="metric-icon amber">◷</span></div><strong>{{ pendingCount() }}</strong><small>Requires administrator review</small></article>
            <article class="metric"><div class="metric-top"><span>Audit events today</span><span class="metric-icon purple">≡</span></div><strong>3,892</strong><small><em>+12.2%</em> vs yesterday</small></article>
          </div>

          <div class="section-tabs">
            <button [class.selected]="section() === 'overview'" (click)="setSection('overview')">Overview</button>
            <button [class.selected]="section() === 'users'" (click)="setSection('users')">Users & roles</button>
            <button [class.selected]="section() === 'requests'" (click)="setSection('requests')">Access requests</button>
            <button [class.selected]="section() === 'audit'" (click)="setSection('audit')">Audit trail</button>
            <button [class.selected]="section() === 'features'" (click)="setSection('features')">Platform settings</button>
          </div>

          @if (section() === 'overview') {
            <div class="two-col">
              <section class="panel">
                <div class="panel-heading"><div><h2>Access requests</h2><p>Review recent requests for elevated platform access.</p></div><button class="text-button" (click)="setSection('requests')">View all →</button></div>
                <div class="table-wrap"><table><thead><tr><th>REQUESTER</th><th>REQUESTED ROLE</th><th>SUBMITTED</th><th>STATUS</th><th></th></tr></thead>
                  <tbody>
                    @for (request of requests().slice(0, 4); track request.id) {
                      <tr><td><strong>{{ request.requester }}</strong><small>{{ request.id }}</small></td><td>{{ request.role }}</td><td>{{ request.submitted }}</td><td><span class="status" [class.pending]="request.status === 'Pending'" [class.approved]="request.status === 'Approved'" [class.rejected]="request.status === 'Rejected'">{{ request.status }}</span></td><td>@if (request.status === 'Pending') { <button class="row-action" (click)="approve(request.id)">Review</button> }</td></tr>
                    }
                  </tbody></table></div>
              </section>
              <section class="panel">
                <div class="panel-heading"><div><h2>Platform health</h2><p>Administrative service indicators.</p></div><span class="healthy">● All systems normal</span></div>
                <div class="health-list">
                  <div class="health-row"><span>Identity & access service</span><strong>Operational</strong><i class="health-dot"></i></div>
                  <div class="health-row"><span>Audit event pipeline</span><strong>Operational</strong><i class="health-dot"></i></div>
                  <div class="health-row"><span>Customer directory</span><strong>Operational</strong><i class="health-dot"></i></div>
                  <div class="health-row"><span>Policy engine</span><strong>Operational</strong><i class="health-dot"></i></div>
                </div>
                <div class="health-foot">Last refreshed just now <span>View service status →</span></div>
              </section>
            </div>
            <section class="panel roles-panel">
              <div class="panel-heading"><div><h2>Role & permission matrix</h2><p>High-level access model for the banking platform.</p></div><button class="text-button" (click)="setSection('users')">Manage roles →</button></div>
              <div class="table-wrap"><table><thead><tr><th>ROLE</th><th>ACCOUNTS</th><th>PAYMENTS</th><th>CUSTOMERS</th><th>FRAUD & RISK</th><th>ADMIN</th></tr></thead><tbody>
                @for (role of roleMatrix; track role.name) {<tr><td><strong>{{ role.name }}</strong><small>{{ role.description }}</small></td>@for (permission of role.permissions; track $index) {<td><span class="permission" [class.allowed]="permission"> {{ permission ? '✓' : '—' }} </span></td>}</tr>}
              </tbody></table></div>
            </section>
          }

          @if (section() === 'users') {
            <section class="panel">
              <div class="panel-heading"><div><h2>Users & roles</h2><p>Directory of platform users and assigned access roles.</p></div><button class="primary small" (click)="showNewRequestInfo()">＋ Add user</button></div>
              <div class="toolbar"><input aria-label="Search users" placeholder="Search name, email or role..." [value]="userSearch()" (input)="userSearch.set(inputValue($event))"><span>{{ filteredUsers().length }} users shown</span></div>
              <div class="table-wrap"><table><thead><tr><th>USER</th><th>ROLE</th><th>STATUS</th><th>LAST LOGIN</th><th>ACTION</th></tr></thead><tbody>
                @for (user of filteredUsers(); track user.email) {<tr><td><strong>{{ user.name }}</strong><small>{{ user.email }}</small></td><td>{{ user.role }}</td><td><span class="status" [class.approved]="user.status === 'Active'" [class.rejected]="user.status === 'Suspended'">{{ user.status }}</span></td><td>{{ user.lastLogin }}</td><td><button class="row-action" (click)="toggleUser(user.email)">{{ user.status === 'Active' ? 'Suspend' : 'Activate' }}</button></td></tr>}
              </tbody></table></div>
            </section>
          }

          @if (section() === 'requests') {
            <section class="panel">
              <div class="panel-heading"><div><h2>Access request queue</h2><p>Maker-checker workflow for privileged access changes.</p></div><span class="status pending">{{ pendingCount() }} pending</span></div>
              <div class="table-wrap"><table><thead><tr><th>REQUEST ID</th><th>REQUESTER</th><th>ROLE</th><th>SYSTEM</th><th>SUBMITTED</th><th>STATUS / ACTION</th></tr></thead><tbody>
                @for (request of requests(); track request.id) {<tr><td><strong>{{ request.id }}</strong></td><td>{{ request.requester }}</td><td>{{ request.role }}</td><td>{{ request.system }}</td><td>{{ request.submitted }}</td><td>@if (request.status === 'Pending') {<button class="row-action approve" (click)="approve(request.id)">Approve</button><button class="row-action reject" (click)="reject(request.id)">Reject</button>} @else {<span class="status" [class.approved]="request.status === 'Approved'" [class.rejected]="request.status === 'Rejected'">{{ request.status }}</span>}</td></tr>}
              </tbody></table></div>
            </section>
          }

          @if (section() === 'audit') {
            <section class="panel">
              <div class="panel-heading"><div><h2>Audit trail</h2><p>Sample immutable-style administrative activity records.</p></div><button class="secondary" (click)="auditSearch.set('')">Clear filter</button></div>
              <div class="toolbar"><input aria-label="Search audit events" placeholder="Filter by actor, action or target..." [value]="auditSearch()" (input)="auditSearch.set(inputValue($event))"><span>{{ filteredAudit().length }} events</span></div>
              <div class="table-wrap"><table><thead><tr><th>TIMESTAMP</th><th>ACTOR</th><th>ACTION</th><th>TARGET</th><th>RESULT</th></tr></thead><tbody>
                @for (event of filteredAudit(); track $index) {<tr><td>{{ event.time }}</td><td>{{ event.actor }}</td><td>{{ event.action }}</td><td>{{ event.target }}</td><td><span class="status approved">{{ event.result }}</span></td></tr>}
              </tbody></table></div>
            </section>
          }

          @if (section() === 'features') {
            <section class="panel">
              <div class="panel-heading"><div><h2>Platform settings</h2><p>Illustrative feature controls. Changes are local to this demo.</p></div><span class="status pending">Sandbox configuration</span></div>
              <div class="settings-list">
                @for (feature of features(); track feature.name) {<div class="setting"><div><strong>{{ feature.name }}</strong><p>{{ feature.description }}</p></div><button class="toggle" [class.on]="feature.enabled" (click)="toggleFeature(feature.name)" [attr.aria-pressed]="feature.enabled"><span></span></button></div>}
              </div>
            </section>
          }
          @if (notice()) {<div class="toast" role="status">{{ notice() }}<button (click)="notice.set('')">×</button></div>}
          <footer>© 2026 Northstar Banking · Administration Console <span>Demo environment · Synthetic data only</span></footer>
        </section>
      </main>
    </div>
  `,
  styles: [`
    :host{display:block;min-height:100vh;color:#1d2939;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
    *{box-sizing:border-box}.shell{min-height:100vh;background:#f5f7fb}.sidebar{width:244px;background:#101d35;color:#d7dfed;position:fixed;inset:0 auto 0 0;padding:25px 16px;display:flex;flex-direction:column;z-index:2}
    .brand{display:flex;align-items:center;gap:11px;padding:0 8px 34px;color:white}.brand-mark{width:35px;height:35px;border-radius:10px;background:#3478e5;display:grid;place-items:center;font-weight:800;font-size:20px}.brand strong,.brand small,.sidebar-bottom strong,.sidebar-bottom small{display:block}.brand small{font-size:10px;color:#91a0b8;margin-top:3px}.nav-label{font-size:9px;letter-spacing:1.2px;color:#71819d;font-weight:800;padding:0 11px 12px}.nav-item{border:0;background:transparent;color:#aebbd0;text-align:left;padding:12px 11px;border-radius:7px;margin:2px 0;font-size:12px;display:flex;gap:12px;align-items:center;cursor:pointer}.nav-item span{font-size:16px;width:17px;text-align:center}.nav-item.active,.nav-item:hover{background:#213758;color:white}.nav-count{margin-left:auto;background:#b7791f;color:white;border-radius:10px;padding:2px 7px;font-size:10px}.sidebar-bottom{margin-top:auto;border-top:1px solid #2b3b56;padding:18px 5px 0;display:flex;align-items:center;gap:10px}.avatar,.top-avatar{width:31px;height:31px;border-radius:50%;background:#dbeafe;color:#1d4ed8;display:grid;place-items:center;font-size:10px;font-weight:800}.sidebar-bottom strong{font-size:11px;color:white}.sidebar-bottom small{font-size:9px;color:#91a0b8;margin-top:3px}
    .main{margin-left:244px}.topbar{height:65px;background:white;border-bottom:1px solid #e8edf4;display:flex;align-items:center;justify-content:space-between;padding:0 34px}.crumb{font-size:11px;color:#8994a6}.crumb strong{color:#344054}.top-actions{display:flex;align-items:center;gap:20px}.environment{font-size:9px;letter-spacing:.6px;color:#64748b;font-weight:800}.environment i,.health-dot{display:inline-block;width:7px;height:7px;background:#20a36a;border-radius:50%;margin-right:6px}.top-avatar{width:29px;height:29px}
    .content{max-width:1500px;margin:auto;padding:30px 34px}.page-heading{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}.eyebrow{font-size:9px;letter-spacing:1.4px;color:#3977d5;font-weight:800}h1{font-size:25px;letter-spacing:-.6px;margin:7px 0 5px;color:#17253d} .page-heading p,.panel-heading p{font-size:11px;color:#8792a3;margin:0}.primary,.secondary{border:0;border-radius:6px;background:#2868d7;color:white;font-size:11px;font-weight:700;padding:11px 15px;cursor:pointer}.primary:hover{background:#1d55b5}.primary.small{padding:8px 11px}.secondary{background:#eef3fb;color:#40516d;border:1px solid #dce4f0}
    .metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:22px}.metric,.panel{background:white;border:1px solid #e8edf4;border-radius:9px}.metric{padding:16px 18px}.metric-top{display:flex;align-items:center;justify-content:space-between;color:#7c8798;font-size:10px;font-weight:600}.metric-icon{width:27px;height:27px;border-radius:7px;display:grid;place-items:center;font-size:14px}.blue{background:#e9f1ff;color:#3478e5}.green{background:#e5f7ef;color:#159765}.amber{background:#fff4dc;color:#b7791f}.purple{background:#f1eaff;color:#805ad5}.metric>strong{display:block;font-size:25px;margin:9px 0 3px;color:#17253d}.metric>small{font-size:9px;color:#929cad}.metric em{font-style:normal;color:#159765;font-weight:700}
    .section-tabs{display:flex;gap:22px;border-bottom:1px solid #e4eaf2;margin-bottom:18px}.section-tabs button{border:0;background:none;padding:0 1px 12px;color:#8792a3;font-size:11px;cursor:pointer}.section-tabs button.selected{color:#2868d7;border-bottom:2px solid #2868d7;font-weight:800}
    .two-col{display:grid;grid-template-columns:1.25fr .85fr;gap:16px}.panel{padding:18px;margin-bottom:16px;min-width:0}.panel-heading{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:17px}.panel-heading h2{font-size:13px;margin:0 0 5px;color:#1d2939}.text-button{border:0;background:none;color:#2868d7;font-size:10px;font-weight:700;cursor:pointer;white-space:nowrap}.healthy{font-size:9px;color:#159765;background:#e9f8f0;padding:6px 8px;border-radius:12px;white-space:nowrap}
    .table-wrap{overflow-x:auto}table{width:100%;border-collapse:collapse;white-space:nowrap}th{text-align:left;font-size:8px;letter-spacing:.65px;color:#8a95a5;background:#f8fafc;padding:10px 9px;font-weight:800}td{padding:11px 9px;border-bottom:1px solid #eff2f6;font-size:10px;color:#5d6879}td strong{display:block;color:#27364c;font-size:10px}td small{display:block;color:#9aa4b2;font-size:8px;margin-top:3px}.status{display:inline-block;padding:4px 7px;border-radius:10px;font-size:8px;font-weight:800;background:#eef2f7;color:#667085}.status.pending{background:#fff4dd;color:#a66b13}.status.approved{background:#e7f7ef;color:#168457}.status.rejected{background:#fff0ef;color:#c0443b}.row-action{border:0;background:#edf4ff;color:#2868d7;border-radius:4px;padding:5px 8px;font-size:9px;font-weight:700;cursor:pointer;margin-right:4px}.row-action.approve{background:#e7f7ef;color:#168457}.row-action.reject{background:#fff0ef;color:#c0443b}
    .health-list{padding:2px 0}.health-row{display:flex;align-items:center;padding:13px 0;border-bottom:1px solid #eff2f6;font-size:10px;color:#5d6879}.health-row strong{margin-left:auto;margin-right:12px;font-size:9px;color:#168457}.health-dot{margin:0}.health-foot{font-size:9px;color:#9aa4b2;padding-top:14px}.health-foot span{float:right;color:#2868d7;font-weight:700}.roles-panel{margin-top:16px}.permission{display:inline-grid;place-items:center;width:19px;height:19px;border-radius:50%;background:#f1f3f6;color:#a0a8b4;font-weight:700}.permission.allowed{background:#e7f7ef;color:#168457}
    .toolbar{display:flex;align-items:center;justify-content:space-between;margin:0 0 13px}.toolbar input{width:min(360px,70%);border:1px solid #dfe6ef;border-radius:6px;padding:9px 11px;font-size:10px;outline:none}.toolbar input:focus{border-color:#6c9ce9}.toolbar span{font-size:9px;color:#929cad}.settings-list{max-width:850px}.setting{display:flex;justify-content:space-between;align-items:center;padding:17px 5px;border-bottom:1px solid #edf1f5}.setting strong{font-size:11px}.setting p{font-size:9px;color:#8994a6;margin:5px 0 0}.toggle{width:38px;height:21px;border:0;border-radius:20px;background:#cbd3df;padding:3px;cursor:pointer}.toggle span{display:block;width:15px;height:15px;border-radius:50%;background:white;transition:transform .15s}.toggle.on{background:#2870dc}.toggle.on span{transform:translateX(17px)}.toast{position:fixed;right:25px;bottom:25px;background:#142641;color:white;padding:12px 16px;border-radius:7px;font-size:11px;box-shadow:0 8px 30px #17253d30}.toast button{border:0;background:none;color:white;margin-left:15px;cursor:pointer}footer{font-size:9px;color:#9aa4b2;padding:14px 2px 0}footer span{float:right}
    @media(max-width:1050px){.sidebar{width:205px}.main{margin-left:205px}.content{padding:24px 20px}.metrics{grid-template-columns:repeat(2,1fr)}.two-col{grid-template-columns:1fr}}
    @media(max-width:700px){.sidebar{position:static;width:auto;height:auto;padding:12px}.brand{padding-bottom:12px}.nav-label,.nav-item,.sidebar-bottom{display:none}.main{margin:0}.topbar{padding:0 16px}.content{padding:20px 13px}.page-heading{align-items:flex-start;gap:12px;flex-direction:column}.metrics{gap:8px}.metric{padding:12px}.section-tabs{overflow:auto;gap:16px}.section-tabs button{white-space:nowrap}.panel{padding:13px}footer span{float:none;display:block;margin-top:5px}}
  `]
})
export class AppComponent {
  section = signal('overview');
  notice = signal('');
  userSearch = signal('');
  auditSearch = signal('');
  requests = signal<AccessRequest[]>([
    { id: 'AR-2048', requester: 'Priya Nair', role: 'Payments Supervisor', system: 'Payments', submitted: '10 Nov 2026', status: 'Pending' },
    { id: 'AR-2047', requester: 'Daniel Kim', role: 'Fraud Analyst', system: 'Fraud & Risk', submitted: '10 Nov 2026', status: 'Pending' },
    { id: 'AR-2046', requester: 'Meera Shah', role: 'Customer Operations', system: 'Customers', submitted: '09 Nov 2026', status: 'Approved' },
    { id: 'AR-2045', requester: 'Omar Hassan', role: 'Read-only Auditor', system: 'Platform', submitted: '09 Nov 2026', status: 'Rejected' },
    { id: 'AR-2044', requester: 'Sofia Garcia', role: 'Branch Manager', system: 'Accounts', submitted: '08 Nov 2026', status: 'Pending' }
  ]);
  pendingCount = computed(() => this.requests().filter((item) => item.status === 'Pending').length);
  users = signal<AdminUser[]>([
    { name: 'Priya Nair', email: 'priya.nair@example.test', role: 'Payments Supervisor', status: 'Active', lastLogin: '10 Nov 2026, 09:42' },
    { name: 'Daniel Kim', email: 'daniel.kim@example.test', role: 'Fraud Analyst', status: 'Active', lastLogin: '10 Nov 2026, 09:18' },
    { name: 'Meera Shah', email: 'meera.shah@example.test', role: 'Customer Operations', status: 'Active', lastLogin: '10 Nov 2026, 08:56' },
    { name: 'Omar Hassan', email: 'omar.hassan@example.test', role: 'Read-only Auditor', status: 'Suspended', lastLogin: '07 Nov 2026, 16:20' },
    { name: 'Sofia Garcia', email: 'sofia.garcia@example.test', role: 'Branch Manager', status: 'Active', lastLogin: '10 Nov 2026, 08:10' }
  ]);
  filteredUsers = computed(() => {
    const term = this.userSearch().toLowerCase().trim();
    return this.users().filter((user) => [user.name, user.email, user.role].join(' ').toLowerCase().includes(term));
  });
  auditEvents = signal<AuditEvent[]>([
    { time: '10 Nov 2026 10:42:18', actor: 'Alex Brooks', action: 'ROLE_PERMISSION_UPDATED', target: 'Payments Supervisor', result: 'Success' },
    { time: '10 Nov 2026 10:31:04', actor: 'Priya Nair', action: 'ACCESS_REQUEST_SUBMITTED', target: 'AR-2048', result: 'Success' },
    { time: '10 Nov 2026 10:18:51', actor: 'Alex Brooks', action: 'USER_SESSION_REVOKED', target: 'USR-1082', result: 'Success' },
    { time: '10 Nov 2026 09:57:33', actor: 'Daniel Kim', action: 'CUSTOMER_DATA_EXPORT', target: 'Export job EX-774', result: 'Success' },
    { time: '10 Nov 2026 09:21:09', actor: 'System', action: 'POLICY_SYNC_COMPLETED', target: 'IAM Policy Set v4', result: 'Success' }
  ]);
  filteredAudit = computed(() => {
    const term = this.auditSearch().toLowerCase().trim();
    return this.auditEvents().filter((event) => [event.actor, event.action, event.target].join(' ').toLowerCase().includes(term));
  });
  features = signal([
    { name: 'Step-up authentication', description: 'Require additional verification for privileged actions.', enabled: true },
    { name: 'Maker-checker approvals', description: 'Require a second authorized user for sensitive payment operations.', enabled: true },
    { name: 'Customer export capability', description: 'Allow approved operations roles to export customer reports.', enabled: false },
    { name: 'Privileged session recording', description: 'Record administrative sessions for audit and compliance review.', enabled: true }
  ]);
  roleMatrix = [
    { name: 'Platform Admin', description: 'Full platform administration', permissions: [true, true, true, true, true] },
    { name: 'Operations Manager', description: 'Operational workflow access', permissions: [true, true, true, true, false] },
    { name: 'Fraud Analyst', description: 'Fraud investigation access', permissions: [false, false, true, true, false] },
    { name: 'Read-only Auditor', description: 'View-only audit access', permissions: [true, true, true, true, false] }
  ];

  setSection(value: string): void { this.section.set(value); }
  inputValue(event: Event): string { return (event.target as HTMLInputElement).value; }
  approve(id: string): void {
    this.requests.update((items) => items.map((item) => item.id === id ? { ...item, status: 'Approved' } : item));
    this.notice.set(id + ' approved in the local demo.');
  }
  reject(id: string): void {
    this.requests.update((items) => items.map((item) => item.id === id ? { ...item, status: 'Rejected' } : item));
    this.notice.set(id + ' rejected in the local demo.');
  }
  toggleUser(email: string): void {
    this.users.update((items) => items.map((user) => user.email === email ? { ...user, status: user.status === 'Active' ? 'Suspended' : 'Active' } : user));
    this.notice.set('User status updated locally.');
  }
  toggleFeature(name: string): void {
    this.features.update((items) => items.map((feature) => feature.name === name ? { ...feature, enabled: !feature.enabled } : feature));
  }
  showNewRequestInfo(): void { this.notice.set('Demo action: connect this control to your access-request API.'); }
}
