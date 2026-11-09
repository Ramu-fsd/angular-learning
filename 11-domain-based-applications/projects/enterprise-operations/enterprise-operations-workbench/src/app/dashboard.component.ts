import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { OperationsService } from './operations.service';

@Component({
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <section class="page">
      <div class="heading"><div><p class="eyebrow">MONDAY, 09 NOVEMBER 2026</p><h1>Operations overview</h1><p class="sub">A live view of service health, workload, and delivery priorities.</p></div><a class="primary" routerLink="/work/new">＋ Create work item</a></div>
      <div class="metrics">
        <article><span class="metric-icon blue">▤</span><small>OPEN WORK ITEMS</small><strong>{{ops.openCount()}}</strong><em>Across all teams</em></article>
        <article><span class="metric-icon red">!</span><small>CRITICAL PRIORITY</small><strong>{{ops.criticalCount()}}</strong><em>Requires immediate attention</em></article>
        <article><span class="metric-icon amber">◷</span><small>SLA AT RISK</small><strong>{{ops.slaRiskCount()}}</strong><em>Due within 24 hours</em></article>
        <article><span class="metric-icon green">✓</span><small>RESOLVED</small><strong>{{ops.resolvedCount()}}</strong><em>Completed work items</em></article>
      </div>
      <div class="section-head"><div><h2>Priority work</h2><p>Items requiring operational attention</p></div><a routerLink="/work">View work queue →</a></div>
      <div class="table-wrap"><table><thead><tr><th>WORK ITEM</th><th>TYPE</th><th>PRIORITY</th><th>STATUS</th><th>OWNER</th><th>DUE</th></tr></thead><tbody>
        @for (item of ops.items().slice(0,4); track item.id) {
          <tr><td><a [routerLink]="['/work',item.id]"><b>{{item.id}}</b><span>{{item.title}}</span></a></td><td>{{item.type}}</td><td><span class="pill" [class]="item.priority.toLowerCase()">{{item.priority}}</span></td><td>{{item.status}}</td><td>{{item.assignee}}</td><td>{{item.dueAt | date:'MMM d, h:mm a'}}</td></tr>
        }
      </tbody></table></div>
      <div class="bottom-grid"><article class="info-card"><h3>Operational focus</h3><p>Prioritize critical incidents first, then review work approaching its SLA target. Keep ownership and activity notes current for a reliable handover.</p></article><article class="info-card"><h3>Service delivery</h3><div class="progress-row"><span>Resolved work items</span><b>{{ops.resolvedCount()}} / {{ops.items().length}}</b></div><div class="progress"><span [style.width.%]="ops.items().length ? ops.resolvedCount()/ops.items().length*100 : 0"></span></div><small>Demonstration data · in-memory workflow</small></article></div>
    </section>
  `,
  styles: [`
    .page{padding:30px 34px;max-width:1500px;margin:auto}.heading,.section-head{display:flex;justify-content:space-between;align-items:center;gap:15px}.eyebrow{font-size:10px;letter-spacing:1.4px;color:#8794a7;font-weight:700;margin:0 0 8px}h1{font-size:27px;margin:0;color:#1b2b43;letter-spacing:-.6px}.sub,.section-head p{color:#8591a1;font-size:13px;margin:8px 0 0}.primary{background:#2867c7;color:#fff;text-decoration:none;padding:11px 15px;border-radius:7px;font-size:12px;font-weight:700}.metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin:28px 0 34px}.metrics article,.info-card{background:#fff;border:1px solid #e7ebf1;border-radius:10px;padding:18px;box-shadow:0 2px 8px #172b4406}.metric-icon{display:grid;place-items:center;width:30px;height:30px;border-radius:8px;font-weight:800;margin-bottom:16px}.blue{background:#eaf2ff;color:#3975c8}.red{background:#fff0ed;color:#d65d4c}.amber{background:#fff5e4;color:#b87919}.green{background:#e8f7ef;color:#268454}.metrics small{display:block;color:#8b97a7;font-size:9px;font-weight:700;letter-spacing:1px}.metrics strong{display:block;font-size:27px;color:#1e3049;margin:5px 0}.metrics em{font-size:11px;color:#9aa4b1;font-style:normal}.section-head{margin-bottom:13px}.section-head h2{font-size:17px;margin:0;color:#24364f}.section-head a{font-size:12px;color:#2867c7;text-decoration:none}.table-wrap{overflow:auto;background:#fff;border:1px solid #e7ebf1;border-radius:10px}table{width:100%;border-collapse:collapse;min-width:750px}th{text-align:left;font-size:9px;color:#8d99a9;letter-spacing:1px;background:#fafbfd;padding:14px}td{padding:15px 14px;border-top:1px solid #edf0f4;font-size:11px;color:#657287}td a{display:flex;flex-direction:column;gap:5px;text-decoration:none;color:#273a55}td a b{color:#2867c7;font-size:10px}td a span{font-size:12px}.pill{padding:5px 8px;border-radius:20px;font-size:10px;background:#f1f3f6}.critical{background:#ffebe8;color:#c84c3f}.high{background:#fff2e3;color:#b86c16}.medium{background:#eaf2ff;color:#386ab0}.low{background:#eef5f0;color:#528064}.bottom-grid{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-top:18px}.info-card h3{font-size:13px;margin:0 0 10px;color:#2b3d56}.info-card p{font-size:12px;line-height:1.7;color:#7d899a;margin:0}.progress-row{display:flex;justify-content:space-between;font-size:11px;color:#7d899a}.progress-row b{color:#334761}.progress{height:7px;background:#edf1f6;border-radius:10px;margin:12px 0}.progress span{display:block;height:100%;background:#3d82d6;border-radius:10px}.info-card>small{font-size:10px;color:#9aa4b1}@media(max-width:900px){.metrics{grid-template-columns:repeat(2,1fr)}}@media(max-width:600px){.page{padding:22px 15px}.heading{align-items:flex-start;flex-direction:column}.metrics{gap:9px}.metrics article{padding:13px}.bottom-grid{grid-template-columns:1fr}}
  `]
})
export class DashboardComponent { readonly ops = inject(OperationsService); }
