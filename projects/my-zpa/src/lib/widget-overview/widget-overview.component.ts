import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Widget } from '../shared/models/widget.model';
import { DragAndDropService } from '../shared/services/drag-and-drop.service';
import { DashboardWidget } from '../shared/models/dashboard-widget.model';
import { AssociatedTopic } from '../shared/models/associated-topic';
import { IconPipe } from '../shared/pipes/icon.pipe';
import { TopicFilterComponent } from './topic-filter/topic-filter.component';
import { ClickOutsideDirective } from '../shared/directives/click-outside.directive';
import { FormsModule } from '@angular/forms';
import { FilterByTopicsPipe } from '../shared/pipes/filter-by-topics.pipe';
import { FilterByNamePipe } from '../shared/pipes/filter-by-name.pipe';
import { SortPipe } from '../shared/pipes/sort.pipe';
import { WidgetSizePreviewComponent } from './widget-size-preview/widget-size-preview.component';
import { PreviewPositionPipe } from '../shared/pipes/preview-position.pipe';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-widget-overview',
  templateUrl: './widget-overview.component.html',
  styleUrls: ['./widget-overview.component.scss'],
  standalone: true,
  imports: [
    TopicFilterComponent,
    WidgetSizePreviewComponent,
    ClickOutsideDirective,
    PreviewPositionPipe,
    NgIf,
    NgFor,
    IconPipe,
    FormsModule,
    FilterByTopicsPipe,
    FilterByNamePipe,
    SortPipe,
  ],
})
export class WidgetOverviewComponent {
  private _configurableWidgets: DashboardWidget[] = [];
  @Input() set configurableWidgets(configurableWidgets: DashboardWidget[]) {
    this._configurableWidgets = configurableWidgets;
    this.groupWidgetsByUsage();
  }

  get configurableWidgets(): DashboardWidget[] {
    return this._configurableWidgets;
  }

  private _availableWidgets: Widget[] = [];
  @Input() set availableWidgets(widgets: Widget[]) {
    this._availableWidgets = widgets;
    this.groupWidgetsByUsage();
  }
  get availableWidgets(): Widget[] {
    return this._availableWidgets;
  }

  newWidgets: Widget[] = [];
  widgetsInUse: Widget[] = [];

  searchTerm = '';
  topics: AssociatedTopic[] = Object.values(AssociatedTopic);
  selectedTopics: AssociatedTopic[] = [];
  hovered = '';
  openFilter = false;

  @Output() endConfigureMode = new EventEmitter();
  @Output() saveWidgets = new EventEmitter();
  @Output() dragWidget = new EventEmitter<Widget>();
  @Output() outsideClick = new EventEmitter<MouseEvent>();

  draggableWidget?: Widget;
  currentWidgetPos?: DOMRect;

  @ViewChild('filterButton') filterButtonElement?: ElementRef;

  constructor(public readonly dragAndDropService: DragAndDropService) {}

  groupWidgetsByUsage() {
    this.newWidgets = this.availableWidgets.filter(
      aWidget =>
        !this.configurableWidgets.find(
          widget => widget.widgetId === aWidget.widgetId
        )
    );
    this.widgetsInUse = this.availableWidgets.filter(aWidget =>
      this.configurableWidgets.find(
        widget => widget.widgetId === aWidget.widgetId
      )
    );
  }

  setDraggableWidget(widget: Widget, event: MouseEvent) {
    this.draggableWidget = widget;
    const widgetElement = event.target as Element;
    this.currentWidgetPos = widgetElement.getBoundingClientRect();
  }

  removeFilter(topic: AssociatedTopic) {
    this.selectedTopics = this.selectedTopics.filter(item => item !== topic);
  }
}
