import { Widget } from '../models/widget.model';
import { FilterByNamePipe } from './filter-by-name.pipe';

describe('FilterByNamePipe', () => {
  let pipe: FilterByNamePipe;
  let widgets: Widget[] = []

  beforeEach(() => {
    pipe = new FilterByNamePipe();
    widgets = [
      {widgetId: '1', name: 'Name', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', optimalWidth: 6, optimalHeight: 3},
      {widgetId: '2', name: 'Huge2', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', optimalWidth: 6, optimalHeight: 3},
      {widgetId: '3', name: 'NAMEINCAPS', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', optimalWidth: 6, optimalHeight: 3},
      {widgetId: '4', name: 'Word 2', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', optimalWidth: 6, optimalHeight: 3},
      {widgetId: '5', name: 'whoo', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', optimalWidth: 6, optimalHeight: 3}
    ];
  })

  it('should return all widgets when searchTerm is empty', () => {
    expect(pipe.transform(widgets, '')).toEqual(widgets);
  });

  it('should filter widgets correctly', () => {
    expect(pipe.transform(widgets, 'huge').length).toEqual(1);
  });

  it('should filter widgets correctly regardless of capitalization', () => {
    expect(pipe.transform(widgets, 'NaME').length).toEqual(2);
  });

  it('should filter widgets correctly without considering unecessary spaces', () => {
    expect(pipe.transform(widgets, '   2   ').length).toEqual(2);
  });
});
