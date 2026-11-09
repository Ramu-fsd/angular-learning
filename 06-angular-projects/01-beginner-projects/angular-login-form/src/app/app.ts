import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginForm } from './features/login/login-form';

@Component({
  selector: 'app-root', standalone: true, imports: [LoginForm],
  templateUrl: './app.html', styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {}
