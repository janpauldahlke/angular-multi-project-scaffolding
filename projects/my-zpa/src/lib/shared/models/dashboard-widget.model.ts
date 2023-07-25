import { Widget } from './widget.model';

export enum DashboardTab {
  PatientOverview = 'patient-overview',
  MedicalPatientHistory = 'medical-history'
}

export interface WidgetPosition {
  row: number;
  column: number;
}

export interface DashboardWidget extends Widget {
  widgetId: string;
  dashboardTab: DashboardTab;
  name: string;
  description: string;
  widgetInvocationParams: string;
  associatedTopic: string;
  icon: string;
  url: string;
  width: number;
  height: number;
  row: number;
  column: number;
  optimalWidth: number;
  optimalHeight: number;
}
