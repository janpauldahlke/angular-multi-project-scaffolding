import { Directive, ElementRef } from '@angular/core';
import autoAnimate from '@formkit/auto-animate'

@Directive({
  selector: '[appAutoAnimate]'
})
export class AutoAnimateDirective {
  constructor(private element: ElementRef) {
    autoAnimate(element.nativeElement);
  }
}
