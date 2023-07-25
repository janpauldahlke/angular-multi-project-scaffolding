import { WidgetsEqualPipe } from './widgets-equal.pipe';
import { DashboardTab } from '../models/dashboard-widget.model';

describe('WidgetsEqual', () => {
  let pipe: WidgetsEqualPipe;
  let widget1 = {widgetId: '1', dashboardTab: DashboardTab.PatientOverview, name: 'Medizinische Patientenhistorie', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', row: 1, column: 1, width: 2, height: 2, optimalWidth: 6, optimalHeight: 6};
  let widget1again = {widgetId: '1', dashboardTab: DashboardTab.PatientOverview, name: 'Medizinische Patientenhistorie', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', row: 1, column: 1, width: 2, height: 2, optimalWidth: 6, optimalHeight: 6};
  let widget2 = {widgetId: '2', dashboardTab: DashboardTab.PatientOverview, name: 'Medizinische Patientenhistorie', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', row: 2, column: 2, width: 2, height: 2, optimalWidth: 6, optimalHeight: 6};


  beforeEach(() => {
    pipe = new WidgetsEqualPipe();
  })

  it('should return true if widgets have same positions', () => {
    expect(pipe.transform(widget1, widget1again)).toEqual(true);
  });

  it('should return false if widgets have different positions', () => {
    expect(pipe.transform(widget1, widget2)).toEqual(false);
  });
});
