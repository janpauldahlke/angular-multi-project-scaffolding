import { Routes } from '@angular/router';
import { DashboardTab } from './shared/models/dashboard-widget.model';
import { ErrorComponent, ErrorSite } from './error/error.component';
import { MyZpaComponent } from './my-zpa.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: `${DashboardTab.PatientOverview}`,
    pathMatch: 'full',
  },
  { path: DashboardTab.PatientOverview, component: MyZpaComponent },
  { path: DashboardTab.MedicalPatientHistory, component: MyZpaComponent },
  { path: ErrorSite.Path, component: ErrorComponent },
  { path: '**', redirectTo: '' },
];
