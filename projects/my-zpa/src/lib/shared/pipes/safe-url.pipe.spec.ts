import { TestBed } from '@angular/core/testing';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { inject } from '@angular/core/testing';
import { SafeUrlPipe } from './safe-url.pipe';

describe('SafeUrlPipe', () => {
  beforeEach(() => {
    TestBed
    .configureTestingModule({
      imports: [
        BrowserModule
      ]
    });
  });

  it('create an instance', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    let pipe = new SafeUrlPipe(domSanitizer);
    expect(pipe).toBeTruthy();
  }));
});
