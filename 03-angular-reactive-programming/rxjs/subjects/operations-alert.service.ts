import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface OperationsAlert {
  readonly id: string;
  readonly severity: 'INFO' | 'WARNING' | 'CRITICAL';
  readonly message: string;
  readonly occurredAt: string;
}

@Injectable({ providedIn: 'root' })
export class OperationsAlertService {
  private readonly alertSubject = new Subject<OperationsAlert>();

  readonly alerts$: Observable<OperationsAlert> =
    this.alertSubject.asObservable();

  publish(alert: OperationsAlert): void {
    this.alertSubject.next(alert);
  }
}
