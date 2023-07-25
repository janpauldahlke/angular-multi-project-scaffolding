import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  receiveMessages(): void {
    window.onmessage = (event) => {
      console.log('message received', event.data);
      this.sendMessage(event.data);
    };
  }

  sendMessage(message: any): void {
    const frames: HTMLCollectionOf<HTMLIFrameElement> = document.getElementsByTagName('iframe');
    for (const frame of <any>frames) {
      frame.contentWindow?.postMessage(message, '*');
    }
  }
}
