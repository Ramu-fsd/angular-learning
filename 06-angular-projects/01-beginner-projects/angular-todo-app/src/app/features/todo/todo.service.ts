import { Injectable, computed, signal } from '@angular/core';
import { Todo } from './todo.model';

const STORAGE_KEY = 'angular-todo-app.todos';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly _todos = signal<Todo[]>(this.load());
  readonly todos = this._todos.asReadonly();
  readonly remaining = computed(() => this._todos().filter(todo => !todo.completed).length);

  add(title: string): void {
    const normalized = title.trim();
    if (!normalized) return;
    this.update(todos => [{ id: crypto.randomUUID(), title: normalized, completed: false }, ...todos]);
  }
  toggle(id: string): void {
    this.update(todos => todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }
  remove(id: string): void { this.update(todos => todos.filter(todo => todo.id !== id)); }
  rename(id: string, title: string): void {
    const normalized = title.trim();
    if (!normalized) return;
    this.update(todos => todos.map(todo => todo.id === id ? { ...todo, title: normalized } : todo));
  }
  private update(updater: (todos: Todo[]) => Todo[]): void {
    this._todos.update(updater);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this._todos())); } catch { /* Storage may be unavailable. */ }
  }
  private load(): Todo[] {
    try {
      const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      if (!Array.isArray(value)) return [];
      return value.filter((item): item is Todo =>
        typeof item?.id === 'string' && typeof item?.title === 'string' && typeof item?.completed === 'boolean'
      );
    } catch { return []; }
  }
}
