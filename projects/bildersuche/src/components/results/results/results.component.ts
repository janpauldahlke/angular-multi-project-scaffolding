import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { environment } from 'environment';
import { IHits, IResults, ResultsService } from '../results.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  @Output() image: EventEmitter<IHits | null> = new EventEmitter();
  @Input() query: string = '';

  results: IResults | null = null;
  images_per_page = 50;
  page = 1;
  display_details = false;
  uriCreated = false; // prevent intial render by flag
  isRow = true; //row or list
  constructor(private service: ResultsService) { }

  ngOnChanges(changes: { query: SimpleChange }) {
    if (changes.query.previousValue !== changes.query.currentValue) {
      this.makeRequest()
    }
  }

  prepareQuery(): string {
    if (this.query.length < 1) return ''// could be error for user
    this.uriCreated = true;
    return `${environment.API_URL}/?key=${environment.API_KEY}&q=${this.query}&image_type=photo&per_page=${this.images_per_page}&page=${this.page}`;
  }

  makeRequest() {
    const uri = this.prepareQuery()
    if (this.uriCreated) {
      this.service.makeImageRequest(uri).subscribe((e) => {
        this.results = e;
      })
    }
  }

  prevPage() {
    this.page = this.page - 1;
    this.makeRequest();
  }
  nextPage() {
    this.page = this.page + 1;
    this.makeRequest();
  }

  emitImageToLightBox(image: IHits) {
    this.image.emit(image);
  }

  onToggleChange(ev: any) {
    this.isRow = !this.isRow;
  }
}
