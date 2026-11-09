import { ChangeDetectionStrategy, Component, input } from '@angular/core';
@Component({ selector: 'app-stat-card', standalone: true, template: `
  <article class="stat">
    <span>{{ label() }}</span><strong>{{ value() }}</strong>
    <small [class.positive]="positive()">{{ change() }}</small>
  </article>
`, styles: [`
  .stat { background: white; border: 1px solid #e7eaf1; border-radius: 15px; padding: 18px; display: grid; gap: 9px; }
  span, small { color: #68738a; font-size: .82rem; } strong { font-size: 1.8rem; letter-spacing: -.04em; }
  small.positive { color: #168052; font-weight: 700; }
`] , changeDetection: ChangeDetectionStrategy.OnPush })
export class StatCard {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly change = input.required<string>();
  readonly positive = input(false);
}
