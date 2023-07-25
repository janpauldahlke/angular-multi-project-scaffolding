export interface Widget {
  widgetId: string;
  name: string;
  description: string;
  widgetInvocationParams: string; // JSON Array
  associatedTopic: string; // JSON Array
  icon: string;
  url: string;
  optimalWidth: number;
  optimalHeight: number;
}
