import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results/results.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle'

@NgModule({
  declarations: [
    ResultsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonToggleModule,
  ],
  exports: [
    ResultsComponent
  ]
})
export class ResultsModule { }
