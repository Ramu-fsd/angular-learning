import { TestBed } from '@angular/core/testing';
import { Dashboard } from './dashboard';
describe('Dashboard', () => {
  it('creates dashboard with twelve monthly data points', () => {
    TestBed.configureTestingModule({ imports: [Dashboard] });
    const component = TestBed.createComponent(Dashboard).componentInstance;
    expect(component.revenue.length).toBe(12);
    expect(component.activities.length).toBeGreaterThan(0);
  });
});
