import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Counter } from './counter';

describe('Counter', () => {
  let component: Counter;
  let fixture: ComponentFixture<Counter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Counter],
    }).compileComponents();

    fixture = TestBed.createComponent(Counter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the counter component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize counter with zero', () => {
    expect(component.count()).toBe(0);
  });

  it('should increment counter', () => {
    component.increment();
    expect(component.count()).toBe(1);
  });

  it('should decrement counter', () => {
    component.increment();
    component.decrement();

    expect(component.count()).toBe(0);
  });

  it('should not allow negative values', () => {
    component.decrement();

    expect(component.count()).toBe(0);
  });

  it('should reset counter', () => {
    component.increment();
    component.increment();
    component.reset();

    expect(component.count()).toBe(0);
  });
});
