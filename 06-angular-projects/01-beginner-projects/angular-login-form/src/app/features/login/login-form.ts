import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form', standalone: true, imports: [ReactiveFormsModule],
  templateUrl: './login-form.html', styleUrl: './login-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginForm {
  readonly showPassword = signal(false);
  readonly submittedEmail = signal<string | null>(null);
  readonly form = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] })
  });

  togglePassword(): void { this.showPassword.update(value => !value); }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.submittedEmail.set(this.form.controls.email.value);
    this.form.reset();
  }
}
