import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl',
  standalone: true,
})
export class SafeUrlPipe implements PipeTransform {
  constructor(protected _sanitizer: DomSanitizer) {
  }

  transform(value: string, type: 'url'|'resourceUrl'): SafeUrl|SafeResourceUrl {
    return type === 'url' ? this._sanitizer.bypassSecurityTrustUrl(value) : this._sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
