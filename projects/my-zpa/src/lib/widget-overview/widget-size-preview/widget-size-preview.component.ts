import { Component, Input, OnInit } from '@angular/core';
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-widget-size-preview',
  templateUrl: './widget-size-preview.component.html',
  styleUrls: ['./widget-size-preview.component.scss'],
  standalone: true,
  imports: [
    NgFor,

  ],
})
export class WidgetSizePreviewComponent implements OnInit {
  @Input() optimalHeight = 0;
  @Input() optimalWidth = 0;
  cells: boolean[][] = [];

  ngOnInit(): void {
    const gridHeight = Math.max(3, Math.min(this.optimalHeight, 8));
    const gridWidth = 6;
    for (let i = 0; i < gridHeight; i++) {
      this.cells[i] = [];
      for (let j = 0; j < gridWidth; j++) {
        this.cells[i][j] = i < this.optimalHeight && j < this.optimalWidth;
      }
    }
  }
}
