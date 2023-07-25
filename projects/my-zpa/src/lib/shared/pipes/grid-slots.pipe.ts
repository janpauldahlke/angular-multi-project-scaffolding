import { Pipe, PipeTransform } from '@angular/core';
import { DashboardWidget } from '../models/dashboard-widget.model';

@Pipe({
  name: 'gridSlots',
  standalone: true,
})
export class GridSlotsPipe implements PipeTransform {
  transform(widgets: DashboardWidget[], columns: number): number[] {
    let lowestWidget = widgets
    .map(widget => widget.row + widget.height)
    .sort((a, b) => b - a)[0];

    if (!lowestWidget || lowestWidget < 6) {
      lowestWidget = 6;
    }

    const slots: number[] = [];
    for (let i = 1; i <= lowestWidget * columns; i++) {
      slots.push(i);
    }
    return slots;
  }
}
