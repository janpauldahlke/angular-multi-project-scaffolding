import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityBarComponent } from './identity-bar.component';
import { IconPipe } from '../shared/pipes/icon.pipe';
import { AgePipe } from '../shared/pipes/age.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeaturesService } from '../shared/services/features.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardTab } from '../shared/models/dashboard-widget.model';
import { AppComponent } from '../app.component';
import { ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from '../shared/services/data.service';

describe('IdentityBarComponent', () => {
  let component: IdentityBarComponent;
  let fixture: ComponentFixture<IdentityBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IdentityBarComponent,
        IconPipe,
        AgePipe,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          {path: '', redirectTo: `${DashboardTab.PatientOverview}`, pathMatch: 'full'},
          {path: DashboardTab.PatientOverview, component: AppComponent},
          {path: DashboardTab.MedicalPatientHistory + '/:patient', component: AppComponent},
          {path: '**', redirectTo: ''},
        ])
      ],
      providers: [
        { provide: DataService, useValue: {} },
        { provide: FeaturesService, useValue: { cAvailableFeatures: () => []} },
        { provide: ToastrService, useValue: {} } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
