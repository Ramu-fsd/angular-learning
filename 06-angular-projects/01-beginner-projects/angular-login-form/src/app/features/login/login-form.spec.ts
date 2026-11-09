import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginForm } from './login-form';

describe('LoginForm', () => {
  let fixture: ComponentFixture<LoginForm>;
  let component: LoginForm;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [LoginForm] }).compileComponents();
    fixture = TestBed.createComponent(LoginForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the form', () => expect(component.form).toBeTruthy());

  it('requires a valid email and an eight-character password', () => {
    expect(component.form.invalid).toBeTrue();
    component.form.setValue({ email: 'not-an-email', password: 'short' });
    expect(component.form.invalid).toBeTrue();
    component.form.setValue({ email: 'ramu@example.com', password: 'password123' });
    expect(component.form.valid).toBeTrue();
  });

  it('submits a valid demo form and clears the controls', () => {
    component.form.setValue({ email: 'ramu@example.com', password: 'password123' });
    component.submit();
    expect(component.submittedEmail()).toBe('ramu@example.com');
    expect(component.form.controls.password.value).toBe('');
  });
});
