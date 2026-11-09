import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

type CaseStatus = 'Open' | 'In Review' | 'Escalated' | 'Closed';
type RiskLevel = 'Critical' | 'High' | 'Medium' | 'Low';
interface FraudCase {
  id: string;
  customer: string;
  type: string;
  channel: string;
  amount: number;
  risk: RiskLevel;
  status: CaseStatus;
  assigned: string;
  time: string;
  summary: string;
}
interface AlertItem {
  id: string;
  title: string;
  detail: string;
  severity: RiskLevel;
  time: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="layout">
    <aside class="sidebar">
      <div class="brand"><div class="brand-icon">◈</div><div><strong>Northstar</strong><small>Risk Intelligence</small></div></div>
      <div class="nav-caption">INVESTIGATION</div>
      <button class="nav-link active" (click)="section.set('overview')"><span>▦</span> Overview</button>
      <button class="nav-link" (click)="section.set('cases')"><span>◉</span> Case management <b>{{ openCases() }}</b></button>
      <button class="nav-link" (click)="section.set('alerts')"><span>⚑</span> Alert queue</button>
      <button class="nav-link" (click)="section.set('rules')"><span>⌘</span> Detection rules</button>
      <div class="sidebar-bottom"><div class="user-avatar">SK</div><div><strong>Samira Khan</strong><small>Senior Fraud Analyst</small></div></div>
    </aside>
    <main class="main">
      <header class="topbar"><div class="breadcrumb">Risk Intelligence <span>/</span> <strong>Fraud & Risk</strong></div><div class="top-right"><span class="env"><i></i> UAT ENVIRONMENT</span><div class="top-avatar">SK</div></div></header>
      <div class="content">
        <div class="heading"><div><div class="eyebrow">FRAUD OPERATIONS CENTER</div><h1>Fraud & risk workbench</h1><p>Monitor suspicious activity, prioritize alerts and manage investigations.</p></div><button class="primary" (click)="notice.set('Demo mode: connect this action to the case intake API.')">＋ Create investigation</button></div>
        <div class="kpis">
          <article><div class="kpi-label">Open investigations <span class="ico blue">◉</span></div><strong>{{ openCases() }}</strong><small>Across all analyst queues</small></article>
          <article><div class="kpi-label">Critical alerts <span class="ico red">⚑</span></div><strong>08</strong><small><em class="red-text">+2</em> in the last hour</small></article>
          <article><div class="kpi-label">Prevented exposure <span class="ico green">↗</span></div><strong>₹48.6L</strong><small>Illustrative daily total</small></article>
          <article><div class="kpi-label">Avg. review time <span class="ico purple">◷</span></div><strong>12m 40s</strong><small><em>−8.4%</em> vs previous week</small></article>
        </div>
        <div class="tabs">
          <button [class.active-tab]="section() === 'overview'" (click)="section.set('overview')">Overview</button>
          <button [class.active-tab]="section() === 'cases'" (click)="section.set('cases')">Investigations</button>
          <button [class.active-tab]="section() === 'alerts'" (click)="section.set('alerts')">Alert queue</button>
          <button [class.active-tab]="section() === 'rules'" (click)="section.set('rules')">Detection rules</button>
        </div>
        @if (section() === 'overview') {
          <div class="overview-grid">
            <section class="panel">
              <div class="panel-head"><div><h2>Priority investigations</h2><p>Cases requiring analyst attention.</p></div><button class="link" (click)="section.set('cases')">View investigations →</button></div>
              <div class="table-scroll"><table><thead><tr><th>CASE</th><th>TYPE</th><th>AMOUNT</th><th>RISK</th><th>STATUS</th><th>OWNER</th></tr></thead><tbody>
                @for (item of priorityCases(); track item.id) {
                  <tr (click)="selectCase(item)"><td><strong>{{ item.id }}</strong><small>{{ item.customer }}</small></td><td>{{ item.type }}</td><td>{{ item.amount | currency:'INR':'symbol':'1.0-0' }}</td><td><span class="risk" [class]="riskClass(item.risk)">{{ item.risk }}</span></td><td><span class="status" [class]="statusClass(item.status)">{{ item.status }}</span></td><td>{{ item.assigned }}</td></tr>
                }
              </tbody></table></div>
            </section>
            <section class="panel alerts-panel">
              <div class="panel-head"><div><h2>Live alert feed</h2><p>Latest rule-triggered signals.</p></div><button class="link" (click)="section.set('alerts')">All alerts →</button></div>
              @for (alert of alerts().slice(0,4); track alert.id) {
                <div class="alert-row"><div class="alert-mark" [class]="riskClass(alert.severity)">!</div><div class="alert-copy"><strong>{{ alert.title }}</strong><p>{{ alert.detail }}</p><small>{{ alert.time }} · {{ alert.id }}</small></div><span class="risk" [class]="riskClass(alert.severity)">{{ alert.severity }}</span></div>
              }
            </section>
          </div>
          <section class="panel signals-panel">
            <div class="panel-head"><div><h2>Risk signal distribution</h2><p>Illustrative distribution of alerts by severity for the current review window.</p></div><span class="period">LAST 24 HOURS</span></div>
            <div class="distribution">
              @for (item of severitySummary; track item.label) {
                <div class="severity-item"><div class="severity-label"><span><i [class]="item.class"></i>{{ item.label }}</span><strong>{{ item.count }}</strong></div><div class="bar"><span [class]="item.class" [style.width.%]="item.width"></span></div></div>
              }
            </div>
          </section>
        }
        @if (section() === 'cases') {
          <section class="panel">
            <div class="panel-head"><div><h2>Investigation queue</h2><p>Search and manage synthetic fraud investigation cases.</p></div><span class="counter">{{ filteredCases().length }} cases</span></div>
            <div class="filters"><input placeholder="Search case, customer or type..." aria-label="Search cases" [value]="search()" (input)="search.set(inputValue($event))"><select aria-label="Filter risk" [value]="riskFilter()" (change)="riskFilter.set(inputValue($event))"><option value="All">All risk levels</option><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select><select aria-label="Filter status" [value]="statusFilter()" (change)="statusFilter.set(inputValue($event))"><option value="All">All statuses</option><option>Open</option><option>In Review</option><option>Escalated</option><option>Closed</option></select></div>
            <div class="table-scroll"><table><thead><tr><th>CASE ID</th><th>CUSTOMER</th><th>TYPOLOGY</th><th>CHANNEL</th><th>AMOUNT</th><th>RISK</th><th>STATUS</th><th>ASSIGNED TO</th></tr></thead><tbody>
              @for (item of filteredCases(); track item.id) {
                <tr (click)="selectCase(item)"><td><strong>{{ item.id }}</strong><small>{{ item.time }}</small></td><td>{{ item.customer }}</td><td>{{ item.type }}</td><td>{{ item.channel }}</td><td>{{ item.amount | currency:'INR':'symbol':'1.0-0' }}</td><td><span class="risk" [class]="riskClass(item.risk)">{{ item.risk }}</span></td><td><span class="status" [class]="statusClass(item.status)">{{ item.status }}</span></td><td>{{ item.assigned }}</td></tr>
              }
            </tbody></table></div>
          </section>
          @if (selectedCase()) {
            <section class="panel detail-panel">
              <div class="panel-head"><div><h2>Investigation detail · {{ selectedCase()!.id }}</h2><p>{{ selectedCase()!.customer }} · {{ selectedCase()!.type }}</p></div><button class="close" (click)="selectedCase.set(null)">×</button></div>
              <p class="summary">{{ selectedCase()!.summary }}</p>
              <div class="detail-meta"><span>Channel <strong>{{ selectedCase()!.channel }}</strong></span><span>Amount <strong>{{ selectedCase()!.amount | currency:'INR':'symbol':'1.0-0' }}</strong></span><span>Assigned analyst <strong>{{ selectedCase()!.assigned }}</strong></span><span>Risk level <strong>{{ selectedCase()!.risk }}</strong></span></div>
              <div class="decision"><button class="action-secondary" (click)="updateCase(selectedCase()!.id, 'In Review')">Mark in review</button><button class="action-secondary" (click)="updateCase(selectedCase()!.id, 'Escalated')">Escalate</button><button class="action-primary" (click)="updateCase(selectedCase()!.id, 'Closed')">Close case</button></div>
            </section>
          }
        }
        @if (section() === 'alerts') {
          <section class="panel">
            <div class="panel-head"><div><h2>Alert queue</h2><p>Signals generated by illustrative transaction-monitoring rules.</p></div><span class="counter">{{ alerts().length }} alerts</span></div>
            @for (alert of alerts(); track alert.id) {
              <div class="alert-list-row"><div class="alert-mark" [class]="riskClass(alert.severity)">!</div><div class="alert-copy"><strong>{{ alert.title }}</strong><p>{{ alert.detail }}</p><small>{{ alert.time }} · {{ alert.id }}</small></div><span class="risk" [class]="riskClass(alert.severity)">{{ alert.severity }}</span><button class="row-btn" (click)="createCaseFromAlert(alert)">Create case</button></div>
            }
          </section>
        }
        @if (section() === 'rules') {
          <section class="panel">
            <div class="panel-head"><div><h2>Detection rules</h2><p>Illustrative rule catalogue and operational controls.</p></div><span class="counter">4 configured rules</span></div>
            @for (rule of rules(); track rule.name) {
              <div class="rule-row"><div class="rule-symbol">⌘</div><div class="rule-info"><strong>{{ rule.name }}</strong><p>{{ rule.description }}</p><small>{{ rule.category }} · Updated {{ rule.updated }}</small></div><span class="rule-state" [class.disabled]="!rule.enabled">{{ rule.enabled ? 'Enabled' : 'Disabled' }}</span><button class="toggle" [class.on]="rule.enabled" (click)="toggleRule(rule.name)" [attr.aria-pressed]="rule.enabled"><span></span></button></div>
            }
          </section>
        }
        @if (notice()) {<div class="toast" role="status">{{ notice() }}<button (click)="notice.set('')">×</button></div>}
        <footer>© 2026 Northstar Banking · Fraud & Risk Operations <span>Training environment · Synthetic data only</span></footer>
      </div>
    </main>
  </div>
  `,
  styles: [`
    :host{display:block;min-height:100vh;font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;color:#202c3f}*{box-sizing:border-box}.layout{min-height:100vh;background:#f4f6fa}.sidebar{position:fixed;inset:0 auto 0 0;width:235px;background:#111d33;color:#d8e1ef;padding:24px 15px;display:flex;flex-direction:column}.brand{display:flex;gap:10px;align-items:center;padding:0 8px 36px;color:#fff}.brand-icon{width:35px;height:35px;border-radius:9px;background:#286bd5;display:grid;place-items:center;font-size:22px}.brand strong,.brand small,.sidebar-bottom strong,.sidebar-bottom small{display:block}.brand strong{font-size:14px}.brand small{font-size:9px;color:#91a1bb;margin-top:3px}.nav-caption{font-size:9px;letter-spacing:1.2px;color:#74849f;font-weight:800;padding:0 10px 12px}.nav-link{border:0;background:transparent;color:#aebbd0;padding:12px 10px;margin:2px 0;text-align:left;border-radius:6px;font-size:11px;display:flex;align-items:center;gap:12px;cursor:pointer}.nav-link span{font-size:16px;width:17px;text-align:center}.nav-link.active,.nav-link:hover{background:#223957;color:white}.nav-link b{margin-left:auto;background:#a63f40;color:#fff;border-radius:10px;padding:2px 7px;font-size:9px}.sidebar-bottom{margin-top:auto;border-top:1px solid #2a3a54;padding:17px 5px 0;display:flex;align-items:center;gap:10px}.user-avatar,.top-avatar{width:31px;height:31px;border-radius:50%;background:#dbeafe;color:#1e55a4;display:grid;place-items:center;font-size:10px;font-weight:800}.sidebar-bottom strong{font-size:10px;color:#fff}.sidebar-bottom small{font-size:9px;color:#91a1bb;margin-top:3px}.main{margin-left:235px}.topbar{height:63px;background:#fff;border-bottom:1px solid #e7ebf1;padding:0 32px;display:flex;align-items:center;justify-content:space-between}.breadcrumb{font-size:10px;color:#8a95a5}.breadcrumb span{padding:0 7px;color:#c0c7d1}.breadcrumb strong{color:#344054}.top-right{display:flex;align-items:center;gap:18px}.env{font-size:9px;letter-spacing:.6px;font-weight:800;color:#718096}.env i{display:inline-block;width:7px;height:7px;background:#19a36a;border-radius:50%;margin-right:6px}.top-avatar{width:29px;height:29px}.content{max-width:1500px;margin:auto;padding:29px 32px}.heading{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px}.eyebrow{font-size:9px;letter-spacing:1.3px;font-weight:800;color:#3474d2}h1{font-size:25px;letter-spacing:-.6px;color:#18263d;margin:7px 0 5px}.heading p,.panel-head p{margin:0;font-size:10px;color:#8994a5}.primary,.action-primary{border:0;border-radius:6px;background:#286bd5;color:white;padding:10px 14px;font-size:10px;font-weight:700;cursor:pointer}.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:13px;margin-bottom:22px}.kpis article{background:#fff;border:1px solid #e7ebf1;border-radius:8px;padding:15px 17px}.kpi-label{font-size:10px;color:#7e8999;display:flex;align-items:center;justify-content:space-between}.ico{width:26px;height:26px;border-radius:7px;display:grid;place-items:center;font-size:13px}.ico.blue{background:#eaf1ff;color:#3474d2}.ico.red{background:#fff0ef;color:#c34e48}.ico.green{background:#e8f7ef;color:#1b9864}.ico.purple{background:#f1eaff;color:#835ac7}.kpis article>strong{display:block;font-size:24px;margin:8px 0 3px;color:#1b2940}.kpis article>small{font-size:9px;color:#9aa4b2}.kpis em{font-style:normal;color:#199566;font-weight:700}.red-text{color:#c34e48!important}.tabs{display:flex;gap:23px;border-bottom:1px solid #e2e8f0;margin-bottom:17px}.tabs button{background:none;border:0;padding:0 1px 11px;font-size:10px;color:#8792a3;cursor:pointer;white-space:nowrap}.tabs button.active-tab{color:#286bd5;border-bottom:2px solid #286bd5;font-weight:800}.overview-grid{display:grid;grid-template-columns:1.25fr .85fr;gap:15px}.panel{background:white;border:1px solid #e7ebf1;border-radius:8px;padding:17px;margin-bottom:15px;min-width:0}.panel-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:15px}.panel-head h2{font-size:13px;color:#243248;margin:0 0 5px}.link{border:0;background:none;color:#286bd5;font-size:9px;font-weight:700;cursor:pointer;white-space:nowrap}.table-scroll{overflow:auto}table{width:100%;border-collapse:collapse;white-space:nowrap}th{text-align:left;padding:9px 8px;background:#f8fafc;color:#8b96a6;font-size:8px;letter-spacing:.6px}td{padding:10px 8px;border-bottom:1px solid #eff2f6;font-size:9px;color:#667286}tbody tr{cursor:pointer}tbody tr:hover{background:#fafcff}td strong{display:block;color:#2b3a50;font-size:9px}td small{display:block;color:#9ca6b4;font-size:8px;margin-top:3px}.risk,.status{display:inline-block;padding:4px 7px;border-radius:10px;font-size:8px;font-weight:800}.risk-critical{background:#ffeded;color:#bd3434}.risk-high{background:#fff0e5;color:#bd5a1c}.risk-medium{background:#fff7df;color:#a47713}.risk-low{background:#eaf6ef;color:#218456}.status-open{background:#fff4df;color:#a66d17}.status-in-review{background:#eaf1ff;color:#386db9}.status-escalated{background:#ffeded;color:#bd3434}.status-closed{background:#eaf6ef;color:#218456}.alert-row,.alert-list-row{display:flex;align-items:flex-start;gap:10px;padding:12px 0;border-bottom:1px solid #eff2f6}.alert-mark{width:23px;height:23px;border-radius:6px;display:grid;place-items:center;font-weight:900;font-size:11px;flex:none}.alert-mark.risk-critical{background:#ffeded;color:#bd3434}.alert-mark.risk-high{background:#fff0e5;color:#bd5a1c}.alert-mark.risk-medium{background:#fff7df;color:#a47713}.alert-mark.risk-low{background:#eaf6ef;color:#218456}.alert-copy{flex:1;min-width:0}.alert-copy strong{font-size:9px;color:#2c3a50}.alert-copy p{font-size:9px;color:#778397;margin:4px 0}.alert-copy small{font-size:8px;color:#a0a9b6}.signals-panel{margin-top:15px}.period,.counter{font-size:8px;letter-spacing:.6px;color:#7e8a9b;background:#f3f6fa;border-radius:5px;padding:6px 8px;font-weight:800}.distribution{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;padding:7px 0 3px}.severity-label{display:flex;justify-content:space-between;font-size:9px;color:#657184;margin-bottom:8px}.severity-label span{display:flex;align-items:center;gap:6px}.severity-label i{width:7px;height:7px;border-radius:50%}.bar{height:7px;background:#eef1f5;border-radius:8px;overflow:hidden}.bar span{height:100%;display:block;border-radius:8px}.bar .risk-critical,.severity-label .risk-critical{background:#d94e4e}.bar .risk-high,.severity-label .risk-high{background:#e58a49}.bar .risk-medium,.severity-label .risk-medium{background:#e6bd4c}.bar .risk-low,.severity-label .risk-low{background:#38a879}.filters{display:flex;gap:9px;margin-bottom:14px}.filters input,.filters select{border:1px solid #dfe5ed;border-radius:5px;padding:9px 10px;font-size:9px;color:#536176;background:#fff}.filters input{width:min(340px,55%)}.filters select{min-width:130px}.detail-panel{border-color:#cbdcf5}.close{border:0;background:#f1f4f8;border-radius:5px;font-size:17px;color:#657184;cursor:pointer}.summary{font-size:10px;color:#637187;line-height:1.6}.detail-meta{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;padding:12px 0;color:#8a95a5;font-size:9px}.detail-meta strong{display:block;color:#2d3b51;margin-top:5px}.decision{display:flex;gap:8px;margin-top:8px}.action-secondary{border:1px solid #dce5f1;background:#fff;color:#45617f;border-radius:5px;padding:8px 10px;font-size:9px;cursor:pointer}.action-primary{padding:8px 11px}.alert-list-row{align-items:center}.row-btn{border:1px solid #dce5f1;background:#fff;color:#376ab5;border-radius:5px;padding:6px 9px;font-size:8px;cursor:pointer}.rule-row{display:flex;align-items:center;gap:12px;padding:15px 2px;border-bottom:1px solid #eff2f6}.rule-symbol{width:31px;height:31px;border-radius:7px;background:#edf3ff;color:#3b72c6;display:grid;place-items:center}.rule-info{flex:1}.rule-info strong{font-size:10px}.rule-info p{font-size:9px;color:#7f8b9d;margin:4px 0}.rule-info small{font-size:8px;color:#a0a9b6}.rule-state{font-size:8px;color:#168457;background:#eaf7ef;padding:5px 8px;border-radius:10px}.rule-state.disabled{background:#f1f3f6;color:#8b95a4}.toggle{width:36px;height:20px;border:0;border-radius:20px;background:#cbd3df;padding:3px;cursor:pointer}.toggle span{display:block;width:14px;height:14px;background:white;border-radius:50%;transition:transform .15s}.toggle.on{background:#2870dc}.toggle.on span{transform:translateX(16px)}.toast{position:fixed;right:24px;bottom:24px;background:#172941;color:#fff;border-radius:6px;padding:12px 15px;font-size:10px;box-shadow:0 8px 28px #17294130}.toast button{border:0;background:none;color:white;margin-left:12px;cursor:pointer}footer{padding:14px 2px 0;font-size:8px;color:#9aa4b2}footer span{float:right}
    @media(max-width:1050px){.sidebar{width:200px}.main{margin-left:200px}.content{padding:22px 18px}.overview-grid{grid-template-columns:1fr}.kpis{grid-template-columns:repeat(2,1fr)}}
    @media(max-width:700px){.sidebar{position:static;width:auto;padding:12px}.brand{padding-bottom:10px}.nav-caption,.nav-link,.sidebar-bottom{display:none}.main{margin:0}.topbar{padding:0 15px}.content{padding:18px 12px}.heading{align-items:flex-start;flex-direction:column;gap:12px}.kpis{gap:8px}.kpis article{padding:11px}.tabs{overflow:auto;gap:16px}.panel{padding:12px}.distribution{grid-template-columns:repeat(2,1fr)}.filters{flex-wrap:wrap}.filters input{width:100%}.detail-meta{grid-template-columns:repeat(2,1fr)}footer span{float:none;display:block;margin-top:5px}}
  `]
})
export class AppComponent {
  section = signal('overview');
  search = signal('');
  riskFilter = signal('All');
  statusFilter = signal('All');
  selectedCase = signal<FraudCase | null>(null);
  notice = signal('');
  cases = signal<FraudCase[]>([
    { id: 'FR-83041', customer: 'Aarav Mehta', type: 'Card-not-present', channel: 'E-commerce', amount: 184500, risk: 'Critical', status: 'Open', assigned: 'S. Khan', time: '10 Nov · 10:42', summary: 'Multiple high-value card-not-present attempts were detected across newly observed merchant locations within a short time window.' },
    { id: 'FR-83038', customer: 'Nisha Reddy', type: 'Account takeover', channel: 'Mobile app', amount: 92500, risk: 'High', status: 'In Review', assigned: 'R. Das', time: '10 Nov · 10:18', summary: 'A new device and unusual login geography preceded a beneficiary update and an outbound transfer attempt.' },
    { id: 'FR-83032', customer: 'Kabir Shah', type: 'Unusual transfer', channel: 'Net banking', amount: 275000, risk: 'High', status: 'Escalated', assigned: 'S. Khan', time: '10 Nov · 09:56', summary: 'Transfer amount and beneficiary behavior differ materially from the customer baseline.' },
    { id: 'FR-83027', customer: 'Ananya Iyer', type: 'Velocity breach', channel: 'UPI', amount: 48600, risk: 'Medium', status: 'Open', assigned: 'M. Rao', time: '10 Nov · 09:32', summary: 'Transaction velocity exceeded the illustrative customer-level threshold.' },
    { id: 'FR-83019', customer: 'Vikram Patel', type: 'Merchant anomaly', channel: 'POS', amount: 12900, risk: 'Low', status: 'Closed', assigned: 'R. Das', time: '10 Nov · 08:48', summary: 'Merchant category deviation was reviewed and closed as expected customer behavior.' },
    { id: 'FR-83011', customer: 'Sara Thomas', type: 'Card-not-present', channel: 'E-commerce', amount: 76300, risk: 'Medium', status: 'In Review', assigned: 'M. Rao', time: '10 Nov · 08:21', summary: 'Several online authorization attempts were observed with changing device fingerprints.' }
  ]);
  alerts = signal<AlertItem[]>([
    { id: 'AL-5918', title: 'High-value card activity', detail: 'Unusual online spend pattern · FR-83041', severity: 'Critical', time: '2 min ago' },
    { id: 'AL-5917', title: 'New device login anomaly', detail: 'Device fingerprint differs from known profile', severity: 'High', time: '7 min ago' },
    { id: 'AL-5916', title: 'Beneficiary velocity threshold', detail: 'Multiple beneficiary changes within 30 minutes', severity: 'High', time: '13 min ago' },
    { id: 'AL-5915', title: 'UPI transaction velocity', detail: 'Customer transaction count exceeded baseline', severity: 'Medium', time: '21 min ago' },
    { id: 'AL-5914', title: 'Merchant category deviation', detail: 'Spend category differs from historical pattern', severity: 'Low', time: '34 min ago' }
  ]);
  rules = signal([
    { name: 'High-value transaction deviation', description: 'Flag transactions materially above a customer’s normal amount range.', category: 'Transaction monitoring', updated: '08 Nov 2026', enabled: true },
    { name: 'Rapid beneficiary changes', description: 'Detect repeated beneficiary additions or modifications in a short interval.', category: 'Account behavior', updated: '06 Nov 2026', enabled: true },
    { name: 'New device and risky session', description: 'Combine new device signals with unusual session and transaction behavior.', category: 'Digital channel', updated: '05 Nov 2026', enabled: true },
    { name: 'Velocity threshold monitoring', description: 'Identify transaction bursts across defined customer and channel windows.', category: 'Transaction monitoring', updated: '02 Nov 2026', enabled: false }
  ]);
  openCases = computed(() => this.cases().filter((item) => item.status !== 'Closed').length);
  filteredCases = computed(() => {
    const term = this.search().toLowerCase().trim();
    return this.cases().filter((item) =>
      [item.id, item.customer, item.type, item.channel].join(' ').toLowerCase().includes(term) &&
      (this.riskFilter() === 'All' || item.risk === this.riskFilter()) &&
      (this.statusFilter() === 'All' || item.status === this.statusFilter())
    );
  });
  priorityCases = computed(() => this.cases().filter((item) => item.status !== 'Closed').slice(0, 4));
  severitySummary = [
    { label: 'Critical', count: 8, width: 26, class: 'risk-critical' },
    { label: 'High', count: 24, width: 72, class: 'risk-high' },
    { label: 'Medium', count: 41, width: 100, class: 'risk-medium' },
    { label: 'Low', count: 63, width: 84, class: 'risk-low' }
  ];
  inputValue(event: Event): string { return (event.target as HTMLInputElement).value; }
  riskClass(level: string): string { return 'risk-' + level.toLowerCase(); }
  statusClass(status: string): string { return 'status-' + status.toLowerCase().replace(' ', '-'); }
  selectCase(item: FraudCase): void { this.selectedCase.set(item); }
  updateCase(id: string, status: CaseStatus): void {
    this.cases.update((items) => items.map((item) => item.id === id ? { ...item, status } : item));
    const updated = this.cases().find((item) => item.id === id) || null;
    this.selectedCase.set(updated);
    this.notice.set(id + ' updated to ' + status + ' (local demo).');
  }
  createCaseFromAlert(alert: AlertItem): void {
    this.notice.set('Demo action: ' + alert.id + ' is ready for case creation through the future API.');
  }
  toggleRule(name: string): void {
    this.rules.update((items) => items.map((rule) => rule.name === name ? { ...rule, enabled: !rule.enabled } : rule));
  }
}
