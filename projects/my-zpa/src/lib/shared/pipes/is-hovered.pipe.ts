import { Pipe, PipeTransform } from '@angular/core';
import { WidgetPosition } from '../models/dashboard-widget.model';

@Pipe({
  name: 'isHovered',
  standalone: true,
})
export class IsHoveredPipe implements PipeTransform {
  transform(position: WidgetPosition, hoveredPositions: WidgetPosition[]): boolean {
    if (!hoveredPositions.length) {
      return false;
    }

    return !!hoveredPositions.find(pos => pos.row === position.row && pos.column === position.column);
  }
}
