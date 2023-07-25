import { Widget } from '../models/widget.model';
import {SortPipe} from "./sort.pipe";

describe('SortPipe', () => {
  let pipe: SortPipe;
  let widgets: Widget[] = [];
  let sortedWidgets: Widget[] = [];

  beforeEach(() => {
    pipe = new SortPipe();
    widgets = [
      {widgetId: '1', name: 'Zac', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', optimalWidth: 6, optimalHeight: 3},
      {widgetId: '2', name: 'Vector', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', optimalWidth: 6, optimalHeight: 3},
      {widgetId: '3', name: '234', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', optimalWidth: 6, optimalHeight: 3},
      {widgetId: '4', name: 'Alex31', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', optimalWidth: 6, optimalHeight: 3},
      {widgetId: '5', name: '123', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', optimalWidth: 6, optimalHeight: 3},
      {widgetId: '6', name: 'Dimitri', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', optimalWidth: 6, optimalHeight: 3},
      {widgetId: '7', name: 'Alex13', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', optimalWidth: 6, optimalHeight: 3},
      {widgetId: '8', name: 'Ben', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', optimalWidth: 6, optimalHeight: 3}
    ];
    sortedWidgets = [
      {widgetId: '5', name: '123', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', optimalWidth: 6, optimalHeight: 3},
      {widgetId: '3', name: '234', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', optimalWidth: 6, optimalHeight: 3},
      {widgetId: '7', name: 'Alex13', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', optimalWidth: 6, optimalHeight: 3},
      {widgetId: '4', name: 'Alex31', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', optimalWidth: 6, optimalHeight: 3},
      {widgetId: '8', name: 'Ben', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', optimalWidth: 6, optimalHeight: 3},
      {widgetId: '6', name: 'Dimitri', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', optimalWidth: 6, optimalHeight: 3},
      {widgetId: '2', name: 'Vector', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', optimalWidth: 6, optimalHeight: 3},
      {widgetId: '1', name: 'Zac', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', optimalWidth: 6, optimalHeight: 3},
    ];
  })

  it('should sort widgets correctly', () => {
    expect(pipe.transform(widgets)).toEqual(sortedWidgets);
  });

});
