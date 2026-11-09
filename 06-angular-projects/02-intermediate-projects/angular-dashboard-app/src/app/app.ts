import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Dashboard } from './features/dashboard/dashboard';
@Component({ selector: 'app-root', standalone: true, imports: [Dashboard], templateUrl: './app.html', styleUrl: './app.css', changeDetection: ChangeDetectionStrategy.OnPush })
export class App {}
