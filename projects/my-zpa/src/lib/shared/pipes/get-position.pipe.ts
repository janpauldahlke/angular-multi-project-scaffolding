import { Pipe, PipeTransform } from '@angular/core';
import { WidgetPosition } from '../models/dashboard-widget.model';

@Pipe({
  name: 'getPosition',
  standalone: true,
})
export class GetPositionPipe implements PipeTransform {
  transform(index: number, columnAmount: number): WidgetPosition {
    return {
      row: Math.floor(index / columnAmount + 1),
      column: index % columnAmount + 1
    };
  }
}
