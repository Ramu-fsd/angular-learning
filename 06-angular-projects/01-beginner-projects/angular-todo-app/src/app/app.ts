import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodoPage } from './features/todo/todo-page';
@Component({ selector: 'app-root', standalone: true, imports: [TodoPage], templateUrl: './app.html', styleUrl: './app.css', changeDetection: ChangeDetectionStrategy.OnPush })
export class App {}
