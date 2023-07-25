import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IHits } from '../results/results.service';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent {
  @Output() unshowBox = new EventEmitter();
  @Input() image: IHits | null = null;
  @Input() isVisibleLightbox = false;

  closeBox() {
    this.unshowBox.emit(true)
  }
}
