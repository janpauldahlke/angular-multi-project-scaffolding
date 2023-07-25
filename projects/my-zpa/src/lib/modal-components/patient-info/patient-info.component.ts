import {Component, Input} from '@angular/core';
import {Patient} from '../../shared/models/patient.model';
import {AgePipe} from "../../shared/pipes/age.pipe";

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss'],
  standalone: true,
  imports: [
    AgePipe
  ]
})
export class PatientInfoComponent {
  @Input() patient?: Patient;
}
