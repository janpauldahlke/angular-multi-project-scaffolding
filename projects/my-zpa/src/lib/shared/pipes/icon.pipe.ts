import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'icon',
  standalone: true,
})
export class IconPipe implements PipeTransform {
  transform(icon: string, hover = false, disabled = false, active = false): string {
    if (disabled) {
      icon += '_disabled';
    } else if (active) {
      icon += '_active';
    } else if (hover) {
      icon += '_hover'
    }
    return `assets/images/${icon}.svg`;
  }
}
