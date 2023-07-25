import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DashboardWidget } from '../../shared/models/dashboard-widget.model';
import { DragAndDropService } from '../../shared/services/drag-and-drop.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { IconPipe } from '../../shared/pipes/icon.pipe';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  standalone: true,
  imports: [IconPipe, AsyncPipe, NgIf, NgFor],
})
export class WidgetComponent implements OnInit, AfterContentChecked {
  @Input() widget?: DashboardWidget;
  @Input() isInConfigureMode = false;
  @Input() isInFullscreenMode = false;
  @Output() removeWidget = new EventEmitter();
  @Output() startDragging = new EventEmitter();
  @Output() toggleFullscreenMode = new EventEmitter<DashboardWidget>();

  @ViewChild('iframeContainer') iframeContainer?: ElementRef;
  @ViewChild('iframeForm') iframeForm?: ElementRef;

  hovered = '';
  widgetId = this.randomUUID();

  readonly queryParams$ = this.route.queryParamMap.pipe(
    map(paramMap => ({
      patientenId: paramMap.get('patientenId') || '',
      iBSNR: paramMap.get('iBSNR') || '',
    }))
  );

  constructor(
    public readonly dragAndDropService: DragAndDropService,
    private readonly changeDetection: ChangeDetectorRef,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initialiseIFrame();
  }

  // necessary to prevent ExpressionChangedAfterItHasBeenCheckedError
  ngAfterContentChecked(): void {
    this.changeDetection.detectChanges();
  }

  // need to programmatically insert iframe, because Google Chrome can't handle dynamic iframe name attribute
  initialiseIFrame(): void {
    this.changeDetection.detectChanges();
    const iframe = document.createElement('iframe');
    iframe.src = '';
    iframe.name = this.widgetId;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.setAttribute(
      'sandbox',
      'allow-forms allow-scripts allow-popups allow-same-origin'
    );
    this.iframeContainer?.nativeElement.appendChild(iframe);
    this.iframeForm?.nativeElement.submit();
  }

  dragStart(event: DragEvent): void {
    if (this.hovered === 'resize-icon') {
      this.hovered = 'resize';
    }

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }

    // changing drag image in safari breaks drag and drop functionality...
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (this.hovered === 'resize' && event.dataTransfer && !isSafari) {
      event.dataTransfer.setDragImage(new Image(), 0, 0);
    }

    return this.startDragging.emit(this.hovered);
  }

  randomUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
