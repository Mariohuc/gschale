import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";

declare var VANTA: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    VANTA.BIRDS({
      el: "#logincontent",
      mouseControls: true,
      touchControls: true,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color1: 0x39f520,
      color2: 0xfa8503,
      colorMode: "lerp",
      birdSize: 0.8,
    });
  }
}
