import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <main class="shell">
      <header>
        <p class="eyebrow">SOLUTION ARCHITECTURE · FRONTEND</p>
        <h1>Banking Frontend Architecture Lab</h1>
        <p class="muted">Explore architecture layers and estimate baseline frontend traffic and availability budgets.</p>
      </header>

      <section class="architecture panel">
        <h2>Reference architecture</h2>
        <div class="layer"><b>1</b><span><strong>Browser / Angular SPA</strong><small>Presentation · feature state · accessibility</small></span></div>
        <div class="connector">↓ HTTPS</div>
        <div class="layer"><b>2</b><span><strong>CDN + WAF</strong><small>Static asset delivery · edge protection</small></span></div>
        <div class="connector">↓ API requests</div>
        <div class="layer"><b>3</b><span><strong>API Gateway / BFF</strong><small>Authentication · routing · throttling · aggregation</small></span></div>
        <div class="connector">↓ domain APIs</div>
        <div class="domain-grid">
          <div class="domain">Customer Service</div><div class="domain">Account Service</div><div class="domain">Payment Service</div>
        </div>
        <div class="connector">↓</div>
        <div class="layer"><b>4</b><span><strong>Enterprise Data & Events</strong><small>Databases · Kafka · audit · observability</small></span></div>
      </section>

      <section class="calculator panel">
        <p class="eyebrow">NON-FUNCTIONAL REQUIREMENTS</p>
        <h2>Traffic and availability estimator</h2>
        <div class="inputs">
          <label>Concurrent users <strong>{{ concurrentUsers() | number }}</strong>
            <input type="range" min="100" max="100000" step="100" [value]="concurrentUsers()" (input)="setUsers($event)" />
          </label>
          <label>API calls per user / minute <strong>{{ callsPerMinute() }}</strong>
            <input type="range" min="1" max="30" step="1" [value]="callsPerMinute()" (input)="setCalls($event)" />
          </label>
          <label>Availability target
            <select [value]="availability()" (change)="setAvailability($event)">
              <option value="99">99%</option>
              <option value="99.5">99.5%</option>
              <option value="99.9">99.9%</option>
              <option value="99.95">99.95%</option>
              <option value="99.99">99.99%</option>
            </select>
          </label>
        </div>
        <div class="results">
          <article><span>Estimated average request rate</span><strong>{{ estimatedRps() | number:'1.1-1' }} RPS</strong></article>
          <article><span>30-day downtime budget</span><strong>{{ downtimeMinutes() | number:'1.1-1' }} min</strong></article>
        </div>
        <p class="note">Illustrative average only. Production sizing must include peak traffic, retries, cache hit ratio, API fan-out, and workload mix.</p>
      </section>

      <section class="panel">
        <h2>Banking payment dashboard — sample NFRs</h2>
        <div class="nfr-grid">
          <article><b>Performance</b><p>Agree LCP/INP targets and API p95/p99 with product and platform teams.</p></article>
          <article><b>Availability</b><p>Define critical journey SLOs and maintenance/error-budget policy.</p></article>
          <article><b>Security</b><p>OIDC, backend authorization, CSP, masking, audit, and secure session handling.</p></article>
          <article><b>Scalability</b><p>CDN for static assets; independently scale gateway and backend services.</p></article>
          <article><b>Reliability</b><p>Bounded retries, idempotency, graceful degradation, and recoverable errors.</p></article>
          <article><b>Accessibility</b><p>Keyboard support, semantic tables, accessible status announcements, and contrast.</p></article>
        </div>
      </section>
      <footer>Learning calculator · Not a production capacity or SLO commitment</footer>
    </main>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly concurrentUsers = signal(5000);
  readonly callsPerMinute = signal(6);
  readonly availability = signal('99.9');

  readonly estimatedRps = computed(() =>
    this.concurrentUsers() * this.callsPerMinute() / 60
  );

  readonly downtimeMinutes = computed(() =>
    43200 * (1 - Number(this.availability()) / 100)
  );

  setUsers(event: Event): void {
    this.concurrentUsers.set(Number((event.target as HTMLInputElement).value));
  }

  setCalls(event: Event): void {
    this.callsPerMinute.set(Number((event.target as HTMLInputElement).value));
  }

  setAvailability(event: Event): void {
    this.availability.set((event.target as HTMLSelectElement).value);
  }
}
