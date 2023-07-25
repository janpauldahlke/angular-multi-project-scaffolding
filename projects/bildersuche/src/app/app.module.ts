import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from 'src/components/header/header.module';
import { SearchModule } from 'src/components/search/search.module';
import { ResultsModule } from 'src/components/results/results.module';
import { LightboxModule } from 'src/components/lightbox/lightbox.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //own Modules, could be standalone since angular 14 as well
    HeaderModule,
    SearchModule,
    ResultsModule,
    LightboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
