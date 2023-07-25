import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyLibraryModule } from 'projects/my-library/src/public-api';
import { MyZpaComponent } from '../../../my-zpa/src/lib/my-zpa.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MyLibraryModule, MyZpaComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'my-application';
}
