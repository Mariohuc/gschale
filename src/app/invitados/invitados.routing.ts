import { Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { VerifyEmailComponent } from "./verify-email/verify-email.component";
import { SignupVoluntaryComponent } from "./signup-voluntary/signup-voluntary.component";

export const InvitadosRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "verify-email-address",
    component: VerifyEmailComponent
  },
  {
    path: "signup-voluntary",
    component: SignupVoluntaryComponent
  }
];