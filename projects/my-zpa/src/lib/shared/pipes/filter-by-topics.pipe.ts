import { Pipe, PipeTransform } from '@angular/core';
import { Widget } from '../models/widget.model';
import { AssociatedTopic } from '../models/associated-topic';

@Pipe({
  name: 'filterByTopics',
  standalone: true,
})
export class FilterByTopicsPipe implements PipeTransform {
  transform(widgets: Widget[], topics: AssociatedTopic[]): Widget[] {
    if (!topics.length) return widgets;
    return widgets.filter(widget => topics.find(topic => widget.associatedTopic.includes(topic)));
  }
}
