import { Directive, ElementRef, effect, inject, input, Renderer2 } from '@angular/core';

@Directive({
  selector: 'button[appBusyButton]',
  standalone: true
})
export class BusyButtonDirective {
  readonly appBusyButton = input(false);

  private readonly element = inject(ElementRef<HTMLButtonElement>);
  private readonly renderer = inject(Renderer2);

  constructor() {
    effect(() => {
      const busy = this.appBusyButton();
      this.renderer.setProperty(this.element.nativeElement, 'disabled', busy);
      this.renderer.setAttribute(this.element.nativeElement, 'aria-busy', String(busy));
    });
  }
}
