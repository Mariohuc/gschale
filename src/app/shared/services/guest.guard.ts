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

@Injectable({
  providedIn: "root",
})
export class GuestGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map((user) => {
        if(!!user){
          this.router.navigate(['/user/dashboard'])
          return false; 
        }
        return true;
      }) 
    );
  }
}
