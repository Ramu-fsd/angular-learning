import { TestBed } from '@angular/core/testing';
import { SearchFilter } from './search-filter';

describe('SearchFilter', () => {
  let component: SearchFilter;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [SearchFilter] });
    component = TestBed.createComponent(SearchFilter).componentInstance;
  });
  it('shows all people initially', () => expect(component.filteredPeople().length).toBe(6));
  it('filters by search text', () => {
    component.setQuery('backend');
    expect(component.filteredPeople().length).toBe(1);
    expect(component.filteredPeople()[0].name).toBe('Kabir Rao');
  });
  it('filters by department', () => {
    component.setDepartment('Design');
    expect(component.filteredPeople().length).toBe(2);
  });
});
