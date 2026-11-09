import { ChangeDetectionStrategy, Component, signal } from "@angular/core";

@Component({
  selector: "app-counter",
  standalone: true,
  templateUrl: "./counter.html",
  styleUrl: "./counter.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Counter {
  // Reactive state
  readonly count = signal(0);

  // Increment counter
  increment(): void {
    this.count.update((value) => value + 1);
  }

  // Decrement counter
  decrement(): void {
    this.count.update((value) => Math.max(0, value - 1));
  }

  // Reset counter
  reset(): void {
    this.count.set(0);
  }
}
