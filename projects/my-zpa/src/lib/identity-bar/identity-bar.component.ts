import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
//import { expandIdentityBar } from '../../animations';
import { FeaturesService } from '../shared/services/features.service';
import { Subject } from 'rxjs';
import { Patient } from '../shared/models/patient.model';
import { DataService } from '../shared/services/data.service';
import { IconPipe } from '../shared/pipes/icon.pipe';
import { AgePipe } from '../shared/pipes/age.pipe';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
// @tslint ignore-next-line

@Component({
  //animations: [expandIdentityBar],
  imports: [IconPipe, AgePipe, DatePipe, AsyncPipe, NgIf, NgFor],
  selector: 'app-identity-bar',
  standalone: true,
  styleUrls: ['./identity-bar.component.scss'],
  templateUrl: './identity-bar.component.html',
})
export class IdentityBarComponent implements OnDestroy {
  @Input() patient?: Patient;
  @Input() disableConfigureButton = false;
  @Output() startConfigureMode = new EventEmitter();
  showNotes = false;

  hovered = '';

  private readonly unsubscribe = new Subject();

  constructor(
    public readonly featureService: FeaturesService,
    public readonly dataService: DataService
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe.complete();
  }
}
