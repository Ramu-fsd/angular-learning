import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

interface RemoteApp {
  name: string;
  key: string;
  domain: string;
  port: number;
  description: string;
  status: 'Ready' | 'Not started';
  icon: string;
  color: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand"><div class="brand-logo">N</div><div><strong>Northstar</strong><small>Digital Banking</small></div></div>
      <div class="nav-caption">PLATFORM</div>
      <button class="nav active" (click)="activeView.set('overview')"><span>▦</span> Platform overview</button>
      <button class="nav" (click)="activeView.set('architecture')"><span>⌘</span> Architecture</button>
      <button class="nav" (click)="activeView.set('operations')"><span>◉</span> Remote operations</button>
      <div class="sidebar-foot"><div class="avatar">RB</div><div><strong>Platform Operator</strong><small>Integration workspace</small></div></div>
    </aside>
    <main class="main">
      <header class="topbar"><div class="breadcrumb">Northstar Platform <span>/</span> <strong>Integration workspace</strong></div><div class="top-meta"><span class="env"><i></i> LOCAL DEVELOPMENT</span><span class="user">RB</span></div></header>
      <section class="content">
        <div class="hero">
          <div><div class="eyebrow">MICRO FRONTEND CAPSTONE</div><h1>Banking platform integration</h1><p>A unified workspace for the banking shell and independently developed business-domain remotes.</p></div>
          <div class="hero-chip"><span>●</span> Host workspace</div>
        </div>
        <div class="stats">
          <article><span>Remote applications</span><strong>{{ remotes().length }}</strong><small>Accounts, Payments, Customers, Admin, Fraud & Risk</small></article>
          <article><span>Configured local ports</span><strong>5</strong><small>4201 – 4205</small></article>
          <article><span>Integration pattern</span><strong>Native Federation</strong><small>Runtime remote discovery</small></article>
        </div>
        <div class="section-heading"><div><h2>Business domain applications</h2><p>Local development endpoints and integration readiness.</p></div><span class="tag">DEVELOPMENT CATALOG</span></div>
        <div class="remote-grid">
          @for (remote of remotes(); track remote.key) {
            <article class="remote-card">
              <div class="card-top"><div class="remote-icon" [style.background]="remote.color">{{ remote.icon }}</div><span class="state" [class.ready]="remote.status === 'Ready'"><i></i>{{ remote.status }}</span></div>
              <h3>{{ remote.name }}</h3><p>{{ remote.description }}</p>
              <div class="remote-meta"><span>Remote key</span><strong>{{ remote.key }}</strong></div>
              <div class="remote-meta"><span>Local endpoint</span><strong>http://localhost:{{ remote.port }}</strong></div>
              <button class="open-button" (click)="selectRemote(remote)">View integration details <span>→</span></button>
            </article>
          }
        </div>
        @if (selectedRemote()) {
          <section class="detail-panel">
            <div class="detail-head"><div><div class="eyebrow">REMOTE INTEGRATION DETAILS</div><h2>{{ selectedRemote()!.name }}</h2></div><button class="close" (click)="selectedRemote.set(null)">×</button></div>
            <div class="detail-grid"><div><small>Remote key</small><strong>{{ selectedRemote()!.key }}</strong></div><div><small>Development URL</small><strong>http://localhost:{{ selectedRemote()!.port }}</strong></div><div><small>Business domain</small><strong>{{ selectedRemote()!.domain }}</strong></div></div>
            <p class="integration-note">Start this remote in its own Angular workspace. Then register its generated remote entry and exposed module in the host's Native Federation manifest. The exact entry filename and exposed module must match the generated remote configuration.</p>
          </section>
        }
        <div class="bottom-grid">
          <section class="panel">
            <div class="panel-heading"><div><h2>Integration checklist</h2><p>Complete these steps to connect the platform.</p></div><span class="progress">{{ completedCount() }}/5</span></div>
            @for (task of tasks(); track task.id) {
              <label class="check-row"><input type="checkbox" [checked]="task.done" (change)="toggleTask(task.id)"><span [class.done]="task.done">{{ task.label }}</span></label>
            }
          </section>
          <section class="panel">
            <div class="panel-heading"><div><h2>Platform integration principles</h2><p>Keep domain remotes independently owned.</p></div></div>
            <div class="principle"><b>01</b><div><strong>Independent deployment</strong><small>Build and release each domain remote separately.</small></div></div>
            <div class="principle"><b>02</b><div><strong>Runtime composition</strong><small>Resolve remote entry points through the host manifest.</small></div></div>
            <div class="principle"><b>03</b><div><strong>Shared contracts</strong><small>Version shared UI packages and integration contracts.</small></div></div>
            <div class="principle"><b>04</b><div><strong>Defense in depth</strong><small>Enforce authentication and authorization in backend APIs.</small></div></div>
          </section>
        </div>
        <footer>© 2026 Northstar Banking · Micro Frontend Integration Capstone <span>Starter workspace · Synthetic catalog</span></footer>
      </section>
    </main>
  </div>
  `,
  styles: [`
    :host{display:block;min-height:100vh;font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;color:#243248}*{box-sizing:border-box}.app-shell{min-height:100vh;background:#f4f6fa}.sidebar{position:fixed;inset:0 auto 0 0;width:235px;background:#111e35;color:#d7e0ee;padding:24px 15px;display:flex;flex-direction:column}.brand{display:flex;align-items:center;gap:10px;padding:0 8px 37px;color:white}.brand-logo{width:35px;height:35px;border-radius:9px;background:#286bd5;display:grid;place-items:center;font-size:19px;font-weight:800}.brand strong,.brand small,.sidebar-foot strong,.sidebar-foot small{display:block}.brand strong{font-size:14px}.brand small{font-size:9px;color:#92a1b9;margin-top:3px}.nav-caption{font-size:9px;letter-spacing:1.2px;color:#74849f;font-weight:800;padding:0 10px 12px}.nav{border:0;background:transparent;color:#aebbd0;padding:12px 10px;margin:2px 0;border-radius:6px;text-align:left;font-size:11px;display:flex;gap:12px;align-items:center;cursor:pointer}.nav span{width:17px;text-align:center;font-size:16px}.nav.active,.nav:hover{background:#223957;color:white}.sidebar-foot{margin-top:auto;border-top:1px solid #2a3b55;padding:17px 5px 0;display:flex;align-items:center;gap:10px}.avatar,.user{width:30px;height:30px;border-radius:50%;background:#dbeafe;color:#1e55a4;display:grid;place-items:center;font-size:10px;font-weight:800}.sidebar-foot strong{font-size:10px;color:white}.sidebar-foot small{font-size:9px;color:#91a1bb;margin-top:3px}.main{margin-left:235px}.topbar{height:63px;background:#fff;border-bottom:1px solid #e7ebf1;padding:0 32px;display:flex;align-items:center;justify-content:space-between}.breadcrumb{font-size:10px;color:#8a95a5}.breadcrumb span{padding:0 7px;color:#c0c7d1}.breadcrumb strong{color:#344054}.top-meta{display:flex;align-items:center;gap:18px}.env{font-size:9px;letter-spacing:.6px;color:#718096;font-weight:800}.env i{display:inline-block;width:7px;height:7px;background:#1ba36a;border-radius:50%;margin-right:6px}.user{width:28px;height:28px}.content{max-width:1500px;margin:auto;padding:30px 32px}.hero{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px}.eyebrow{font-size:9px;letter-spacing:1.3px;font-weight:800;color:#3474d2}h1{font-size:25px;letter-spacing:-.6px;color:#192840;margin:7px 0 5px}.hero p,.section-heading p,.panel-heading p{font-size:10px;color:#8994a5;margin:0}.hero-chip,.tag{font-size:9px;color:#2768c8;background:#eaf1ff;padding:8px 10px;border-radius:15px;font-weight:800}.hero-chip span{color:#1ba36a;margin-right:5px}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:13px;margin-bottom:27px}.stats article{background:#fff;border:1px solid #e7ebf1;border-radius:8px;padding:15px 17px}.stats article span{display:block;color:#818c9c;font-size:10px}.stats article strong{display:block;color:#1e2d44;font-size:21px;margin:8px 0 4px}.stats article small{color:#9aa4b2;font-size:9px}.section-heading{display:flex;align-items:center;justify-content:space-between;margin-bottom:13px}.section-heading h2,.panel-heading h2{font-size:13px;margin:0 0 5px;color:#25344a}.remote-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:13px}.remote-card{background:#fff;border:1px solid #e5eaf1;border-radius:9px;padding:16px;min-width:0}.card-top{display:flex;align-items:center;justify-content:space-between}.remote-icon{width:34px;height:34px;border-radius:8px;display:grid;place-items:center;font-size:15px;font-weight:800;color:#285b9e}.state{font-size:8px;color:#9a6b17;background:#fff5e0;padding:5px 7px;border-radius:12px;font-weight:800}.state i{display:inline-block;width:5px;height:5px;background:#d69b2d;border-radius:50%;margin-right:5px}.state.ready{background:#eaf7ef;color:#198456}.state.ready i{background:#198456}.remote-card h3{font-size:12px;color:#25344a;margin:13px 0 5px}.remote-card>p{height:31px;font-size:9px;line-height:1.5;color:#8994a5;margin:0 0 13px}.remote-meta{display:flex;justify-content:space-between;gap:8px;padding:7px 0;border-top:1px solid #f0f2f6;font-size:8px;color:#8c97a7}.remote-meta strong{font-size:8px;color:#4a5a70;font-weight:700}.open-button{width:100%;margin-top:9px;border:1px solid #dce6f3;background:#f8faff;color:#3166ad;border-radius:5px;padding:8px;font-size:9px;font-weight:700;text-align:left;cursor:pointer}.open-button span{float:right}.detail-panel,.panel{background:#fff;border:1px solid #e6ebf2;border-radius:8px;padding:17px;margin-top:16px}.detail-panel{border-color:#cbdcf4}.detail-head{display:flex;justify-content:space-between;align-items:center}.detail-head h2{font-size:14px;margin:5px 0}.close{border:0;background:#f1f4f8;border-radius:5px;font-size:17px;color:#68778c;cursor:pointer}.detail-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:12px 0}.detail-grid small,.detail-grid strong{display:block}.detail-grid small{font-size:8px;color:#929cad;margin-bottom:5px}.detail-grid strong{font-size:10px;color:#34445b}.integration-note{font-size:9px;line-height:1.6;color:#758297;background:#f7f9fc;padding:10px;border-radius:5px;margin:0}.bottom-grid{display:grid;grid-template-columns:1fr 1fr;gap:15px}.panel{margin-top:16px}.panel-heading{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:13px}.progress{font-size:9px;color:#2868c8;font-weight:800}.check-row{display:flex;align-items:center;gap:9px;padding:9px 0;border-top:1px solid #eff2f6;font-size:9px;color:#56647a;cursor:pointer}.check-row input{accent-color:#286bd5}.check-row .done{text-decoration:line-through;color:#9aa4b2}.principle{display:flex;gap:11px;align-items:flex-start;padding:9px 0;border-top:1px solid #eff2f6}.principle>b{font-size:9px;color:#3b75ca;background:#edf3ff;border-radius:5px;padding:5px}.principle strong,.principle small{display:block}.principle strong{font-size:9px;color:#3b485c}.principle small{font-size:8px;color:#929cad;margin-top:4px}footer{padding:15px 2px 0;font-size:8px;color:#9aa4b2}footer span{float:right}
    @media(max-width:1100px){.sidebar{width:200px}.main{margin-left:200px}.content{padding:23px 18px}.remote-grid{grid-template-columns:repeat(2,1fr)}}
    @media(max-width:700px){.sidebar{position:static;width:auto;padding:12px}.brand{padding-bottom:10px}.nav-caption,.nav,.sidebar-foot{display:none}.main{margin:0}.topbar{padding:0 14px}.content{padding:18px 12px}.hero{align-items:flex-start;flex-direction:column;gap:12px}.stats{grid-template-columns:1fr}.remote-grid,.bottom-grid{grid-template-columns:1fr}.detail-grid{grid-template-columns:1fr}.section-heading{align-items:flex-start;gap:10px;flex-direction:column}footer span{float:none;display:block;margin-top:5px}}
  `]
})
export class AppComponent {
  activeView = signal('overview');
  selectedRemote = signal<RemoteApp | null>(null);
  remotes = signal<RemoteApp[]>([
    { name: 'Accounts', key: 'accounts', domain: 'Account servicing', port: 4201, description: 'Customer account portfolio, balances and transaction history.', status: 'Not started', icon: 'A', color: '#eaf1ff' },
    { name: 'Payments', key: 'payments', domain: 'Payment operations', port: 4202, description: 'Payment initiation, operations queue and maker-checker workflow.', status: 'Not started', icon: 'P', color: '#e8f7ef' },
    { name: 'Customer Management', key: 'customers', domain: 'Customer servicing', port: 4203, description: 'Customer directory, relationship profiles and service history.', status: 'Not started', icon: 'C', color: '#f2eaff' },
    { name: 'Admin Portal', key: 'admin', domain: 'Platform administration', port: 4204, description: 'User roles, access approvals, audit trail and platform controls.', status: 'Not started', icon: '⚙', color: '#fff4df' },
    { name: 'Fraud & Risk', key: 'fraud-risk', domain: 'Fraud operations', port: 4205, description: 'Fraud alerts, investigation cases and detection rule catalogue.', status: 'Not started', icon: 'R', color: '#ffeded' }
  ]);
  tasks = signal([
    { id: 1, label: 'Create the host workspace and configure Native Federation', done: false },
    { id: 2, label: 'Start and validate each remote independently', done: false },
    { id: 3, label: 'Register remote entry URLs in the host manifest', done: false },
    { id: 4, label: 'Configure remote routes and host navigation', done: false },
    { id: 5, label: 'Run end-to-end checks across all business domains', done: false }
  ]);
  completedCount = computed(() => this.tasks().filter((task) => task.done).length);
  toggleTask(id: number): void {
    this.tasks.update((items) => items.map((task) => task.id === id ? { ...task, done: !task.done } : task));
  }
  selectRemote(remote: RemoteApp): void { this.selectedRemote.set(remote); }
}
