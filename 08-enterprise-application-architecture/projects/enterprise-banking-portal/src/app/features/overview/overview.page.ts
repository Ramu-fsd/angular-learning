import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <p class="eyebrow">EXECUTIVE WORKSPACE</p>
    <h1>Overview</h1>
    <p class="muted">A modular banking portal organized around business capabilities.</p>
    <section class="cards">
      <article><span>Customer profiles</span><strong>24,860</strong><small>Illustrative demo metric</small></article>
      <article><span>Payments processed</span><strong>18,420</strong><small>Illustrative demo metric</small></article>
      <article><span>Cases requiring review</span><strong>126</strong><small>Illustrative demo metric</small></article>
    </section>
    <section class="panel">
      <h2>Architecture at a glance</h2>
      <div class="flow">
        <span>Application shell</span><b>→</b><span>Lazy feature routes</span><b>→</b><span>Feature data access</span>
      </div>
      <p class="muted">Customers and Payments are separate route trees loaded on demand. Shared navigation stays in the application shell.</p>
    </section>
  `,
  styles: [`
    :host { display:block; } .eyebrow { color:#687791; font-size:10px; font-weight:800; letter-spacing:1.4px; }
    h1 { margin:5px 0; font-size:30px; color:#17243b; } .muted { color:#7a879a; font-size:13px; }
    .cards { display:grid; grid-template-columns:repeat(3,1fr); gap:15px; margin:24px 0; }
    article,.panel { background:white; border:1px solid #e7ebf2; border-radius:12px; padding:20px; }
    article span,article small { display:block; color:#78859a; font-size:12px; } article strong { display:block; margin:12px 0 5px; font-size:27px; }
    article small { font-size:10px; } h2 { font-size:17px; margin-top:0; }
    .flow { display:flex; align-items:center; gap:12px; flex-wrap:wrap; margin:18px 0; }
    .flow span { background:#edf2ff; color:#3458aa; border-radius:8px; padding:12px; font-size:12px; font-weight:700; }
    .flow b { color:#8793a8; }
    @media(max-width:650px){ .cards{grid-template-columns:1fr;} }
  `]
})
export class OverviewPage {}
