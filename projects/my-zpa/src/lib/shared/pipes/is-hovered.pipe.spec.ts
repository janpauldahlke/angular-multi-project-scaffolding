import { IsHoveredPipe } from './is-hovered.pipe';
import { WidgetPosition } from '../models/dashboard-widget.model';

describe('IsHoveredPipe', () => {
  it('should only return true if position is hovered over by widget', () => {
    const pipe = new IsHoveredPipe();
    const widgetPositions: WidgetPosition[] = [
      {row: 1, column: 2},
      {row: 1, column: 3},
      {row: 2, column: 2},
      {row: 2, column: 3}
    ];

    // top right widget corner
    expect(pipe.transform({row: 1, column: 2}, widgetPositions)).toEqual(true);
    // outside of widget
    expect(pipe.transform({row: 1, column: 1}, widgetPositions)).toEqual(false);
    expect(pipe.transform({row: 3, column: 3}, widgetPositions)).toEqual(false);
  });
});
