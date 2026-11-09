import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe  } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FraudDataService } from '../../core/fraud-data.service';

@Component({
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  template: `
    <div class="heading"><div><span class="eyebrow">RISK & INVESTIGATIONS</span><h1>Fraud operations overview</h1><p>Monitor suspicious activity and analyst workload.</p></div><a routerLink="/alerts">View alert queue →</a></div>
    <section class="metrics">
      <article><small>Open alerts</small><b>{{data.openCount()}}</b><span class="sub">Require triage</span></article>
      <article><small>Critical alerts</small><b class="red">{{data.criticalCount()}}</b><span class="sub">Immediate attention</span></article>
      <article><small>Under investigation</small><b>{{data.investigatingCount()}}</b><span class="sub">Analyst-owned cases</span></article>
      <article><small>High-risk exposure</small><b>{{data.highRiskExposure()|currency:'USD':'symbol':'1.0-0'}}</b><span class="sub">Illustrative alert value</span></article>
    </section>
    <section class="panel"><div class="panel-head"><div><h2>Priority alerts</h2><p>Highest-severity cases in the current work queue</p></div><a routerLink="/alerts">Open queue</a></div>
      @for(a of data.alerts().slice(0,4);track a.id){<a class="alert" [routerLink]="['/alerts',a.id]"><div class="severity" [class]="a.severity.toLowerCase()"></div><div class="detail"><b>{{a.merchant}}</b><small>{{a.id}} · {{a.transactionId}} · {{a.createdAt|date:'short'}}</small></div><strong>{{a.amount|currency:a.currency}}</strong><span class="tag">{{a.severity}}</span></a>}
    </section>
    <div class="callout"><b>Operational control</b><p>Risk decisions, transaction blocking, analyst permissions, case transitions, and immutable audit records must be enforced by backend services.</p></div>
  `,
  styles: [`
    .heading{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px}.eyebrow{font-size:9px;font-weight:800;letter-spacing:1.4px;color:#4268bd}h1{font-size:26px;margin:8px 0}.heading p,.panel-head p{font-size:12px;color:#7c899c;margin:0}.heading>a,.panel-head>a{font-size:11px;color:#315bb7;text-decoration:none}
    .metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:13px;margin-bottom:18px}.metrics article,.panel{background:#fff;border:1px solid #e5eaf2;border-radius:10px;padding:17px}.metrics small,.sub{display:block;color:#7e8ba0;font-size:10px}.metrics b{display:block;font-size:25px;margin:9px 0 5px}.metrics .red{color:#bd3c38}
    .panel-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}.panel h2{font-size:15px;margin:0 0 5px}.alert{display:flex;align-items:center;gap:13px;padding:14px 0;border-top:1px solid #edf0f5;text-decoration:none;color:#1b2940}.severity{width:8px;height:34px;border-radius:5px;background:#a7b2c2}.severity.critical{background:#c63c3c}.severity.high{background:#e18b37}.severity.medium{background:#d6b94e}.severity.low{background:#48a886}.detail{flex:1}.detail b,.detail small{display:block}.detail b{font-size:11px}.detail small{font-size:9px;color:#8490a2;margin-top:4px}.alert strong{font-size:11px}.tag{font-size:9px;background:#f1f3f7;border-radius:20px;padding:6px 8px;color:#58677e}
    .callout{margin-top:15px;background:#edf3ff;border-radius:8px;padding:14px;font-size:11px}.callout p{margin:5px 0 0;color:#66758d;line-height:1.6}
    @media(max-width:750px){.metrics{grid-template-columns:1fr 1fr}.heading{align-items:flex-start;gap:12px;flex-direction:column}.alert{flex-wrap:wrap}.alert strong{margin-left:auto}}
  `]
})
export class DashboardComponent { readonly data = inject(FraudDataService); }
