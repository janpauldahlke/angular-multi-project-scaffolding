import { GridSlotsPipe } from './grid-slots.pipe';
import { DashboardTab, DashboardWidget } from '../models/dashboard-widget.model';

describe('GridSlotsPipe', () => {

  it('should return enough grid slots for widgets, as well as an extra row', () => {
    const pipe = new GridSlotsPipe();
    const exampleWidget: DashboardWidget[] = [
      {widgetId: '1', dashboardTab: DashboardTab.PatientOverview, name: 'Medizinische Patientenhistorie', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', row: 3, column: 1, width: 2, height: 2, optimalWidth: 6, optimalHeight: 3},
      {widgetId: '2', dashboardTab: DashboardTab.PatientOverview, name: 'Medizinische Patientenhistorie', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', row: 4, column: 1, width: 2, height: 4, optimalWidth: 6, optimalHeight: 3},
      {widgetId: '3', dashboardTab: DashboardTab.PatientOverview, name: 'Letzter Termin', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', row: 2, column: 1, width: 2, height: 1, optimalWidth: 2, optimalHeight: 1}
    ];
    expect(pipe.transform(exampleWidget, 8).length).toEqual(8 * 8);
  });

  it('should return at least 6 rows of slots', () => {
    const pipe = new GridSlotsPipe();
    const exampleWidget: DashboardWidget[] = [];
    expect(pipe.transform(exampleWidget, 8).length).toEqual(8 * 6);
  });
});
