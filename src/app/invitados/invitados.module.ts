import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { DemoMaterialModule } from "../demo-material-module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from "./login/login.component";
import { InvitadosRoutes } from "./invitados.routing";
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { SignupVoluntaryComponent } from './signup-voluntary/signup-voluntary.component';
import { SignupStudentComponent } from './signup-student/signup-student.component';


@NgModule({
  declarations: [
    LoginComponent,
    VerifyEmailComponent,
    SignupVoluntaryComponent,
    SignupStudentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    DemoMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(InvitadosRoutes)],
})
export class InvitadosModule {}
