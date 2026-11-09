import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from './todo.service';

type Filter = 'all' | 'active' | 'completed';

@Component({ selector: 'app-todo-page', standalone: true, imports: [FormsModule], templateUrl: './todo-page.html', styleUrl: './todo-page.css', changeDetection: ChangeDetectionStrategy.OnPush })
export class TodoPage {
  readonly service = inject(TodoService);
  readonly draft = signal('');
  readonly filter = signal<Filter>('all');
  readonly editingId = signal<string | null>(null);
  readonly editTitle = signal('');
  readonly visibleTodos = computed(() => this.service.todos().filter(todo =>
    this.filter() === 'all' || (this.filter() === 'active' ? !todo.completed : todo.completed)
  ));
  add(): void { this.service.add(this.draft()); this.draft.set(''); }
  beginEdit(id: string, title: string): void { this.editingId.set(id); this.editTitle.set(title); }
  saveEdit(id: string): void { this.service.rename(id, this.editTitle()); this.editingId.set(null); }
}
