import { Pipe, PipeTransform } from '@angular/core';
import { DashboardWidget } from '../models/dashboard-widget.model';

@Pipe({
  name: 'widgetsEqual',
  standalone: true,
})
export class WidgetsEqualPipe implements PipeTransform {
  transform(widget1: DashboardWidget | undefined, widget2: DashboardWidget | undefined): boolean {
    return !!widget1 && !!widget2 && widget1.row === widget2.row && widget1.column === widget2.column;
  }
}
