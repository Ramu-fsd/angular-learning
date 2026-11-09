import { Component, inject } from '@angular/core';
import {
  AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors,
  Validators
} from '@angular/forms';

function matchingValuesValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value as { email?: string; confirmEmail?: string };
  if (!value.email || !value.confirmEmail) return null;
  return value.email === value.confirmEmail ? null : { emailMismatch: true };
}

@Component({
  selector: 'app-kyc-onboarding',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
      <h2>Customer onboarding</h2>

      <label for="fullName">Full name</label>
      <input id="fullName" formControlName="fullName" autocomplete="name" />
      @if (form.controls.fullName.touched && form.controls.fullName.invalid) {
        <p role="alert">Enter a name between 2 and 80 characters.</p>
      }

      <label for="email">Email address</label>
      <input id="email" type="email" formControlName="email" autocomplete="email" />

      <label for="confirmEmail">Confirm email</label>
      <input id="confirmEmail" type="email" formControlName="confirmEmail" />
      @if (form.hasError('emailMismatch') && form.controls.confirmEmail.touched) {
        <p role="alert">Email addresses do not match.</p>
      }

      <label>
        <input type="checkbox" formControlName="privacyAcknowledged" />
        I acknowledge the privacy notice.
      </label>

      <button type="submit" [disabled]="form.invalid">Continue to KYC review</button>
    </form>
  `
})
export class KycOnboardingComponent {
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.group({
    fullName: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(80)
    ]),
    email: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(254)
    ]),
    confirmEmail: this.fb.nonNullable.control('', [Validators.required]),
    privacyAcknowledged: this.fb.nonNullable.control(false, [Validators.requiredTrue])
  }, { validators: matchingValuesValidator });

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    // Demo only. Send the validated DTO to a backend over HTTPS.
    const request = this.form.getRawValue();
    console.info('KYC onboarding form is ready for API submission', {
      fullNameProvided: Boolean(request.fullName),
      emailProvided: Boolean(request.email),
      privacyAcknowledged: request.privacyAcknowledged
    });
  }
}
