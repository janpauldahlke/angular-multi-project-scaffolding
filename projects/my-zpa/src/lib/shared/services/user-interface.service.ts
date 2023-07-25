import { computed, Injectable } from '@angular/core';
import {
  fromEvent,
  map,
} from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class UserInterfaceService {
  private windowWidth$ = fromEvent(window, 'resize').pipe(
    map(event => (event.target as Window).innerWidth)
  );
  readonly cWindowWidth = toSignal(this.windowWidth$, {initialValue: window.innerWidth});
  readonly cIsMobile = computed(() => this.cWindowWidth() <= 480);

  private windowHeight$ = fromEvent(window, 'resize').pipe(
    map(event => (event.target as Window).innerHeight)
  );
  readonly cWindowHeight = toSignal(this.windowHeight$, {initialValue: window.innerHeight});
}
