import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
//import { AuthGuard } from "./shared/services/auth.guard";
import { GuestGuard } from "./shared/services/guest.guard";

export const AppRoutes: Routes = [
  {
    path: 'user',
    component: FullComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: '',
    loadChildren: () => import('./invitados/invitados.module').then( m => m.InvitadosModule),
    canActivate: [GuestGuard],
  },
];
