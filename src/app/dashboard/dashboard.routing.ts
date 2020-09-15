import { Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard.component";

export const DashboardRoutes: Routes = [
  {
    path: '',
    redirectTo: '/user/dashboard',
    pathMatch: "full"
  },
  {
    path: "dashboard",
    component: DashboardComponent,
  },
];
