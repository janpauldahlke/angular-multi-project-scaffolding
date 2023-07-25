import { Pipe, PipeTransform } from '@angular/core';
import { Widget } from '../models/widget.model';

@Pipe({
  name: 'sort',
  standalone: true,
})
export class SortPipe implements PipeTransform {
  transform(widgets: Widget[]): Widget[] {
    return widgets.sort((a, b) => {
        return a.name.localeCompare(b.name, undefined, {
          numeric: true,
          sensitivity: 'base'
        })
      });
  }
}
