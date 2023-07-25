import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Output() image = new EventEmitter<any>();
  @Output() query = new EventEmitter<string>();
  isError = false;
  searchForm = new FormGroup({
    searchTerm: new FormControl('')
  })

  constructor() { }
  ngOnInit() { }

  searchImages() {
    if (this.searchTerm) {
      this.query.emit(this.searchTerm)
    }
  }

  emitQuery(event: any) {
    if (this.searchTerm) {
      this.query.emit(this.searchTerm);
    }
  }

  get searchTerm() {
    return this.searchForm.controls.searchTerm.value;
  }
}
