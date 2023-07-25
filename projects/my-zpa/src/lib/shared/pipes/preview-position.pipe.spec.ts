import { PreviewPositionPipe } from './preview-position.pipe';

describe('PreviewPositionPipe', () => {
  it('should only return true if position is hovered over by widget', () => {
    const pipe = new PreviewPositionPipe();
    let widget = {
      widgetId: '1',
      name: 'Medizinische Patientenhistorie1',
      description: '',
      widgetInvocationParams: '',
      associatedTopic: '',
      icon: 'placeholder',
      url: 'https://www.google.com/',
      optimalWidth: 6,
      optimalHeight: 5};
    let smallWidget = {...widget, optimalHeight: 1};
    let bigWidget = {...widget, optimalHeight: 10};

    const position = {
      bottom: 0, left: 0, right: 0, top: 0, width: 0, x: 0, toJSON(): any {}, y: 0, height: 100
    }
    position.y = 0;
    position.height = 100;

    expect(pipe.transform(widget, position)?.x).toEqual('-70px');
    expect(pipe.transform(widget, position)?.y).toEqual('16px');

    expect(pipe.transform(smallWidget, position)?.x).toEqual('-70px');
    expect(pipe.transform(smallWidget, position)?.y).toEqual('26px');

    expect(pipe.transform(bigWidget, position)?.x).toEqual('-70px');
    expect(pipe.transform(bigWidget, position)?.y).toEqual('1px');
  });
});
