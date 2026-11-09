import { Component } from '@angular/core';
import { Counter } from './features/counter/counter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Counter],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
