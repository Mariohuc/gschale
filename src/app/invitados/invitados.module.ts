import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { DemoMaterialModule } from "../demo-material-module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoginComponent } from "./login/login.component";
import { InvitadosRoutes } from "./invitados.routing";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule, 
    DemoMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(InvitadosRoutes)],
})
export class InvitadosModule {}
