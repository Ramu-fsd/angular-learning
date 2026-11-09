import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { OperationsAlertService } from './operations-alert.service';

@Component({
  selector: 'app-alert-feed',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  template: `
    <h2>Operations alerts</h2>
    @if (alerts.alerts$ | async; as alert) {
      <article>
        <strong>{{ alert.severity }}</strong>
        <p>{{ alert.message }}</p>
        <time>{{ alert.occurredAt | date:'medium' }}</time>
      </article>
    } @else {
      <p>No new alerts.</p>
    }
  `
})
export class AlertFeedComponent {
  readonly alerts = inject(OperationsAlertService);
}
