import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, exhaustMap, concatMap } from 'rxjs';

interface SettlementInstruction {
  readonly instructionId: string;
  readonly amountMinorUnits: number;
}

interface CommandResult {
  readonly commandId: string;
  readonly accepted: boolean;
}

@Injectable({ providedIn: 'root' })
export class PaymentCommandService {
  private readonly http = inject(HttpClient);

  private readonly submitClicks = new Subject<void>();
  private readonly settlementQueue = new Subject<SettlementInstruction>();

  // Ignore repeated submit triggers while one request is in flight.
  // The backend must still enforce an idempotency key.
  readonly submitResult$: Observable<CommandResult> = this.submitClicks.pipe(
    exhaustMap(() => this.http.post<CommandResult>('/api/payment-drafts/demo/submit', {
      idempotencyKey: crypto.randomUUID()
    }))
  );

  // Preserve order for a sequence of settlement instructions.
  readonly settlementResults$: Observable<CommandResult> = this.settlementQueue.pipe(
    concatMap((instruction) =>
      this.http.post<CommandResult>('/api/settlements/instructions', instruction)
    )
  );

  requestSubmit(): void {
    this.submitClicks.next();
  }

  enqueueSettlement(instruction: SettlementInstruction): void {
    this.settlementQueue.next(instruction);
  }
}
