import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

interface Person { readonly id: number; readonly name: string; readonly role: string; readonly department: string; }

@Component({
  selector: 'app-search-filter', standalone: true, templateUrl: './search-filter.html',
  styleUrl: './search-filter.css', changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFilter {
  readonly query = signal('');
  readonly department = signal('All');
  readonly sortOrder = signal<'asc' | 'desc'>('asc');
  readonly people: readonly Person[] = [
    { id: 1, name: 'Aarav Sharma', role: 'Frontend Engineer', department: 'Engineering' },
    { id: 2, name: 'Diya Patel', role: 'Product Designer', department: 'Design' },
    { id: 3, name: 'Kabir Rao', role: 'Backend Engineer', department: 'Engineering' },
    { id: 4, name: 'Meera Iyer', role: 'Talent Partner', department: 'People' },
    { id: 5, name: 'Ishaan Das', role: 'UX Researcher', department: 'Design' },
    { id: 6, name: 'Anaya Reddy', role: 'QA Engineer', department: 'Engineering' }
  ];
  readonly departments = ['All', 'Engineering', 'Design', 'People'];
  readonly filteredPeople = computed(() => {
    const term = this.query().trim().toLowerCase();
    return this.people
      .filter(person => this.department() === 'All' || person.department === this.department())
      .filter(person => !term || `${person.name} ${person.role} ${person.department}`.toLowerCase().includes(term))
      .sort((a, b) => a.name.localeCompare(b.name) * (this.sortOrder() === 'asc' ? 1 : -1));
  });

  setQuery(value: string): void { this.query.set(value); }
  setDepartment(value: string): void { this.department.set(value); }
  toggleSort(): void { this.sortOrder.update(value => value === 'asc' ? 'desc' : 'asc'); }
}
