import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from "@angular/core";


@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {

  constructor(private elementRef: ElementRef) { }

  @Input() toggleButtonRef?: ElementRef | undefined;
  @Output() appClickOutside = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }
    const clickedInside = this.elementRef.nativeElement.contains(targetElement) || this.toggleButtonRef?.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.appClickOutside.emit(event);
    }
  }
}
