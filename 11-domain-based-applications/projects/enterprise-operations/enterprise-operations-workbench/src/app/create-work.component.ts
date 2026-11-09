import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { OperationsService } from './operations.service';
import { Priority, WorkType } from './work.models';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="page"><a routerLink="/work" class="back">← Back to work queue</a><p class="eyebrow">WORK MANAGEMENT</p><h1>Create work item</h1><p class="sub">Capture an incident or service request for the operations team.</p>
      <form [formGroup]="form" (ngSubmit)="submit()"><div class="form-grid">
        <label class="wide">Short description<input formControlName="title" placeholder="e.g. Settlement file ingestion delayed"><small>Use a clear, actionable summary.</small></label>
        <label>Work type<select formControlName="type"><option>Incident</option><option>Service Request</option></select></label>
        <label>Priority<select formControlName="priority"><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select></label>
        <label>Requester<input formControlName="requester" placeholder="Team or requestor name"></label>
        <label>Department<select formControlName="department"><option>Finance</option><option>Operations</option><option>Technology</option><option>HR</option><option>Customer Experience</option><option>Logistics</option></select></label>
        <label class="wide">Description<textarea formControlName="description" rows="5" placeholder="Describe impact, symptoms, and relevant context..."></textarea></label>
      </div><div class="actions"><a routerLink="/work">Cancel</a><button type="submit" [disabled]="form.invalid">Create work item</button></div></form>
    </section>
  `,
  styles: [`
    .page{padding:28px 34px;max-width:900px;margin:auto}.back{font-size:11px;color:#2867c7;text-decoration:none}.eyebrow{font-size:10px;color:#8794a7;letter-spacing:1.4px;font-weight:700;margin:25px 0 8px}h1{font-size:27px;color:#1b2b43;margin:0}.sub{font-size:12px;color:#8793a3;margin:8px 0 24px}form{background:#fff;border:1px solid #e7ebf1;border-radius:10px;padding:23px}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}label{font-size:11px;color:#52627a}.wide{grid-column:1/-1}input,select,textarea{display:block;width:100%;box-sizing:border-box;margin-top:7px;padding:11px;border:1px solid #dfe5ed;border-radius:6px;font:12px Arial;color:#34465e;background:#fff}textarea{resize:vertical}label small{display:block;color:#9aa4b1;font-size:9px;margin-top:5px}.actions{display:flex;justify-content:flex-end;align-items:center;gap:18px;border-top:1px solid #edf0f4;margin-top:24px;padding-top:18px}.actions a{font-size:11px;color:#78869a;text-decoration:none}.actions button{background:#2867c7;color:white;border:0;border-radius:6px;padding:11px 17px;font-size:11px;font-weight:700;cursor:pointer}.actions button:disabled{opacity:.45;cursor:not-allowed}@media(max-width:600px){.page{padding:22px 15px}.form-grid{grid-template-columns:1fr}.wide{grid-column:auto}form{padding:16px}}
  `]
})
export class CreateWorkComponent {
  private readonly fb = inject(FormBuilder);
  private readonly ops = inject(OperationsService);
  private readonly router = inject(Router);
  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    type: ['Incident' as WorkType, Validators.required],
    priority: ['Medium' as Priority, Validators.required],
    requester: ['', Validators.required],
    department: ['Operations', Validators.required],
    description: ['', [Validators.required, Validators.minLength(15)]]
  });
  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const id = this.ops.create(this.form.getRawValue());
    this.router.navigate(['/work', id]);
  }
}
