import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";
import { tap, map, take } from "rxjs/operators";
import { Roles } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class VoluntarioAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map((user) => {
        if(!user || user.emailVerified === false){
          console.log("access denied");      
          this.router.navigate(["/login"]);
          return false;
        }else if( user.rol !== Roles.VOLUNTARIO ){
          console.log("access denied");      
          this.router.navigate(["/user/dashboard"]);
          return false;
        }
        return true;
      }) // <-- map to boolean
    );
  }
}
