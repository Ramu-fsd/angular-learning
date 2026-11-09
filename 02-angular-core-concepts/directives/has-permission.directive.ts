import {
  Directive, ElementRef, Renderer2, effect, inject, input
} from '@angular/core';

@Directive({
  selector: '[appHasPermission]',
  standalone: true
})
export class HasPermissionDirective {
  readonly appHasPermission = input.required<string>();
  readonly permissions = input.required<readonly string[]>();

  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  constructor() {
    effect(() => {
      const requiredPermission = this.appHasPermission();
      const granted = this.permissions().includes(requiredPermission);

      if (granted) {
        this.renderer.removeAttribute(this.element.nativeElement, 'hidden');
      } else {
        this.renderer.setAttribute(this.element.nativeElement, 'hidden', '');
      }
    });
  }
}
