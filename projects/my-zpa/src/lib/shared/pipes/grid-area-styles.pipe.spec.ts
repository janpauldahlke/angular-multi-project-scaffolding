import { GridAreaStylesPipe } from './grid-area-styles.pipe';
import { DashboardTab, DashboardWidget } from '../models/dashboard-widget.model';

describe('GridAreaStylesPipe', () => {

  it('should return grid-area attributes from widget data', () => {
    const pipe = new GridAreaStylesPipe();
    const exampleWidget: DashboardWidget = {widgetId: '1', dashboardTab: DashboardTab.PatientOverview, name: 'Medizinische Patientenhistorie', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', row: 1, column: 1, width: 2, height: 2,  optimalWidth: 6, optimalHeight: 3};
    expect(pipe.transform(exampleWidget))
    .toEqual(`${exampleWidget.column} / ${exampleWidget.row} / span ${exampleWidget.height} / span ${exampleWidget.width}`);
  });
});
