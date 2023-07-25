import { Component, Input } from '@angular/core';
import { IHits } from 'src/components/results/results.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @Input() isLightBoxOpen = false;
  title = 'Bildersuche mit akquinet';
  image: IHits | null = null;
  query = '';

  propagateQuery(query: string) {
    this.query = query;
  }

  propagateImage(image: any) {
    this.image = image;
    this.isLightBoxOpen = !this.isLightBoxOpen;
  }

  toggleBox(ev: boolean) {
    this.isLightBoxOpen = !ev;
  }
}
