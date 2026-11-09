import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  beforeEach(() => {
    localStorage.removeItem('angular-todo-app.todos');
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });
  it('adds, completes, renames and removes tasks', () => {
    service.add('Learn Angular');
    const id = service.todos()[0].id;
    expect(service.remaining()).toBe(1);
    service.toggle(id);
    expect(service.remaining()).toBe(0);
    service.rename(id, 'Practice Angular');
    expect(service.todos()[0].title).toBe('Practice Angular');
    service.remove(id);
    expect(service.todos().length).toBe(0);
  });
  it('ignores blank task titles', () => {
    service.add('   ');
    expect(service.todos().length).toBe(0);
  });
});
