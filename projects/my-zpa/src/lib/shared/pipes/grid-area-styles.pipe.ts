import { Pipe, PipeTransform } from '@angular/core';
import { DashboardWidget } from '../models/dashboard-widget.model';

@Pipe({
  name: 'gridAreaStyles',
  standalone: true,
})
export class GridAreaStylesPipe implements PipeTransform {
  transform(widget: DashboardWidget): string {
    return `${widget.row} / ${widget.column} / span ${widget.height} / span ${widget.width}`;
  }
}
