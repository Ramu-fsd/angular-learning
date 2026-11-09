import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskedReference',
  standalone: true,
  pure: true
})
export class MaskedReferencePipe implements PipeTransform {
  transform(value: string | null | undefined, visibleCharacters = 4): string {
    if (!value) return '—';

    const safeVisibleCount = Math.max(0, Math.min(visibleCharacters, value.length));
    const visible = value.slice(-safeVisibleCount);
    const maskedLength = Math.max(0, value.length - safeVisibleCount);

    return `${'•'.repeat(maskedLength)}${visible}`;
  }
}
