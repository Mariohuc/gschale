import { Routes } from "@angular/router";
import { AuthGuard } from "../shared/services/auth.guard";
import { AsesoriasComponent } from "./asesorias/asesorias.component";
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
    canActivate: [AuthGuard], 
  },
  {
    path: "asesorias",
    component: AsesoriasComponent,
    canActivate: [AuthGuard], 
  },
];
