import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchFilter } from './features/search/search-filter';

@Component({ selector: 'app-root', standalone: true, imports: [SearchFilter], templateUrl: './app.html', styleUrl: './app.css', changeDetection: ChangeDetectionStrategy.OnPush })
export class App {}
