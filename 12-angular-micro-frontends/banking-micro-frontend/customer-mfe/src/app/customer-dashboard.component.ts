import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CustomersService } from './customers.service';

@Component({
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  template: `
    <section class="page">
      <div class="heading"><div><p class="eyebrow">BANKING DOMAIN / CUSTOMER SERVICES</p><h1>Customer relationships</h1><p class="sub">A consolidated view of customer profiles and relationship health.</p></div><span class="snapshot">DEMO DATA · 10 NOV 2026</span></div>
      <div class="metrics"><article><small>TOTAL CUSTOMERS</small><strong>{{customers.totalCustomers()}}</strong><em>In this demonstration</em></article><article><small>ACTIVE RELATIONSHIPS</small><strong>{{customers.activeCustomers()}}</strong><em>Currently active</em></article><article><small>REVIEW REQUIRED</small><strong>{{customers.reviewRequired()}}</strong><em>Needs follow-up</em></article><article><small>RELATIONSHIP VALUE</small><strong>{{customers.totalRelationshipValue() | currency:'INR':'symbol':'1.0-0'}}</strong><em>Illustrative aggregate</em></article></div>
      <div class="section-head"><div><h2>Customer directory</h2><p>Search and select a customer to view their relationship profile.</p></div><span>{{filtered().length}} results</span></div>
      <div class="filters"><input placeholder="Search name, customer ID, email, city..." [value]="query()" (input)="query.set($any($event.target).value)"><select [value]="segment()" (change)="segment.set($any($event.target).value)"><option>All</option><option>Retail</option><option>Business</option><option>Wealth</option></select><select [value]="status()" (change)="status.set($any($event.target).value)"><option>All</option><option>Active</option><option>Review Required</option><option>Restricted</option></select></div>
      <div class="customer-grid">
        @for (customer of filtered(); track customer.id) {
          <a class="customer-card" [routerLink]="['/',customer.id]"><div class="card-top"><span class="segment">{{customer.segment}} banking</span><span class="state" [class]="stateClass(customer.status)">{{customer.status}}</span></div><div class="identity"><span class="avatar">{{initials(customer.name)}}</span><div><h3>{{customer.name}}</h3><small>{{customer.id}} · {{customer.city}}</small></div></div><div class="contact"><span>{{customer.email}}</span><span>{{customer.phone}}</span></div><div class="card-facts"><div><small>LINKED ACCOUNTS</small><b>{{customer.linkedAccounts.length}}</b></div><div><small>RELATIONSHIP VALUE</small><b>{{customer.relationshipValue | currency:'INR':'symbol':'1.0-0'}}</b></div></div><div class="card-bottom"><span>RM: {{customer.relationshipManager}}</span><b>View profile →</b></div></a>
        } @empty {<div class="empty">No customers match the selected search and filters.</div>}
      </div>
      <div class="disclaimer">Customer names, contact details, and relationship values are synthetic portfolio data.</div>
    </section>
  `,
  styles: [`
    .page{max-width:1250px;margin:auto;padding:30px}.heading,.section-head{display:flex;justify-content:space-between;align-items:center;gap:12px}.eyebrow{font-size:9px;letter-spacing:1.4px;color:#8293a7;font-weight:700;margin:0 0 8px}h1{font-size:25px;color:#20334d;margin:0}.sub,.section-head p{font-size:11px;color:#8996a7;margin:8px 0 0}.snapshot{font-size:8px;letter-spacing:.8px;color:#46816f;background:#eaf6f1;padding:7px 9px;border-radius:5px}.metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:25px 0 30px}.metrics article{background:#fff;border:1px solid #e7ecf2;border-radius:9px;padding:15px}.metrics small{display:block;font-size:8px;letter-spacing:1px;color:#8b98a8;font-weight:700}.metrics strong{display:block;font-size:22px;color:#243951;margin:9px 0 3px}.metrics em{font-size:9px;color:#9aa5b2;font-style:normal}.section-head{margin-bottom:13px}.section-head h2{font-size:15px;color:#2b3e57;margin:0}.section-head>span{font-size:9px;color:#8a97a8}.filters{display:flex;gap:9px;margin-bottom:14px}.filters input,.filters select{border:1px solid #dfe6ee;background:#fff;padding:10px;border-radius:6px;font-size:10px;color:#53657d}.filters input{flex:1;min-width:180px}.customer-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.customer-card{background:#fff;border:1px solid #e7ecf2;border-radius:9px;padding:16px;text-decoration:none;color:inherit}.customer-card:hover{border-color:#a9cdbf;box-shadow:0 4px 14px #193c630d}.card-top{display:flex;justify-content:space-between;gap:8px}.segment,.state{font-size:8px;padding:5px 7px;border-radius:4px;background:#f0f4f8;color:#64768e}.state.active{background:#e8f6ef;color:#32845b}.state.review-required{background:#fff4e4;color:#a87728}.state.restricted{background:#ffedeb;color:#bd5149}.identity{display:flex;align-items:center;gap:11px;margin:17px 0 13px}.avatar{width:38px;height:38px;border-radius:50%;background:#e8f5ef;color:#28795f;display:grid;place-items:center;font-size:11px;font-weight:700}.identity h3{font-size:13px;color:#2c405a;margin:0 0 4px}.identity small{font-size:9px;color:#8b98a8}.contact{display:grid;gap:5px;font-size:9px;color:#77869a}.card-facts{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:15px;padding-top:13px;border-top:1px solid #edf0f4}.card-facts small{display:block;font-size:7px;letter-spacing:.8px;color:#98a4b2;margin-bottom:5px}.card-facts b{font-size:10px;color:#42546d}.card-bottom{display:flex;justify-content:space-between;gap:8px;border-top:1px solid #edf0f4;margin-top:13px;padding-top:11px;font-size:8px;color:#8996a6}.card-bottom b{color:#287b64;white-space:nowrap}.empty{grid-column:1/-1;padding:30px;text-align:center;background:#fff;border:1px solid #e7ecf2;border-radius:8px;color:#8996a7;font-size:11px}.disclaimer{font-size:9px;color:#9aa5b2;margin-top:13px}@media(max-width:850px){.metrics{grid-template-columns:repeat(2,1fr)}}@media(max-width:650px){.page{padding:22px 15px}.heading{align-items:flex-start;flex-direction:column}.filters{flex-wrap:wrap}.filters input{flex-basis:100%}.customer-grid{grid-template-columns:1fr}}
  `]
})
export class CustomerDashboardComponent {
  readonly customers = inject(CustomersService);
  readonly query = signal('');
  readonly segment = signal('All');
  readonly status = signal('All');
  readonly filtered = computed(() => this.customers.search(this.query(), this.segment(), this.status()));
  initials(name: string): string { return name.split(' ').filter((part) => part.length > 0).map((part) => part.charAt(0)).join('').toUpperCase(); }
  stateClass(value: string): string { return value.toLowerCase().replaceAll(' ', '-'); }
}
