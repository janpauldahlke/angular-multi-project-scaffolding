import { Widget } from '../models/widget.model';
import { AssociatedTopic } from '../models/associated-topic';
import { FilterByTopicsPipe } from './filter-by-topics.pipe';

describe('FilterByTopicsPipe', () => {
  let pipe: FilterByTopicsPipe;
  let widgets: Widget[] = []

  beforeEach(() => {
    pipe = new FilterByTopicsPipe();
    widgets = [
      {widgetId: '1', name: 'Name', description: '', widgetInvocationParams: '', associatedTopic: AssociatedTopic.Labor, icon: 'placeholder', url: 'https://www.google.com/', optimalWidth: 6, optimalHeight: 3},
      {widgetId: '2', name: 'Huge2', description: '', widgetInvocationParams: '', associatedTopic: AssociatedTopic.Labor, icon: 'placeholder', url: 'https://www.google.com/', optimalWidth: 6, optimalHeight: 3},
      {widgetId: '3', name: 'NAMEINCAPS', description: '', widgetInvocationParams: '', associatedTopic: AssociatedTopic.Termine, icon: 'placeholder', url: 'https://www.google.com/', optimalWidth: 6, optimalHeight: 3},
      {widgetId: '4', name: 'Word 2', description: '', widgetInvocationParams: '', associatedTopic: AssociatedTopic.Formulare, icon: 'placeholder', url: 'https://www.google.com/', optimalWidth: 6, optimalHeight: 3},
      {widgetId: '5', name: 'whoo', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', optimalWidth: 6, optimalHeight: 3}
    ];
  })

  it('should return all widgets when searchTerm is empty', () => {
    expect(pipe.transform(widgets, [])).toEqual(widgets);
  });

  it('should filter widgets correctly', () => {
    expect(pipe.transform(widgets, [AssociatedTopic.Labor]).length).toEqual(2);
    expect(pipe.transform(widgets, [AssociatedTopic.Termine]).length).toEqual(1);
    expect(pipe.transform(widgets, [AssociatedTopic.Labor, AssociatedTopic.Termine]).length).toEqual(3);
    expect(pipe.transform(widgets, [AssociatedTopic.Labor, AssociatedTopic.Termine, AssociatedTopic.Formulare]).length).toEqual(4);
  });
});
