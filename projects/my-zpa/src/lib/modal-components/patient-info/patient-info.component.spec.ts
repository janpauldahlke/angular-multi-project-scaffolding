import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInfoComponent } from './patient-info.component';
import { AgePipe } from '../../shared/pipes/age.pipe';

describe('PatientInfoComponent', () => {
  let component: PatientInfoComponent;
  let fixture: ComponentFixture<PatientInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PatientInfoComponent, AgePipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
