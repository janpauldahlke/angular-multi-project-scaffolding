import { Pipe, PipeTransform } from '@angular/core';
import { Widget } from '../models/widget.model';

@Pipe({
  name: 'previewPosition',
  standalone: true,
})
export class PreviewPositionPipe implements PipeTransform {
  transform(widget: Widget | undefined, position: DOMRect | undefined): {x: string, y: string} | undefined {
    if (!widget || !position) return;

    const x = position.x - 70 + 'px';

    const cells = Math.max(3, Math.min(widget.optimalHeight, 8));
    const gridHeight = 20 + cells * 10 - 2;
    const y = position.y + position.height / 2 - gridHeight / 2 + 'px';

    return {x, y};
  }
}
