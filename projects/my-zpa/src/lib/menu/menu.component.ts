import { Component, signal } from '@angular/core';
import { DashboardTab } from '../shared/models/dashboard-widget.model';
import { DataService } from '../shared/services/data.service';
import { RouteDataService } from '../shared/services/route-data.service';
import { UserInterfaceService } from '../shared/services/user-interface.service';
import {RouterLink} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    AsyncPipe
  ]
})
export class MenuComponent {
  hovered = '';
  user = signal('Nutzer');

  protected readonly DashboardTab = DashboardTab;

  constructor(protected readonly routeDataService: RouteDataService,
              protected readonly userInterfaceService: UserInterfaceService,
              protected readonly dataService: DataService) {
  }
}
