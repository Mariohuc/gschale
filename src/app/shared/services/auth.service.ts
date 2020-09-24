import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../models/user";

import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { UserService } from "./user.service";
import { DataVoluntarioService } from "./dataVoluntario.service";
import { DataAlumnoService } from "./dataAlumno.service";
import { Observable, of } from "rxjs";
import { switchMap, take, map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthService {
  user$: Observable<User | null | undefined>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private afsu: UserService,
    private afsdv: DataVoluntarioService,
    private afsda: DataAlumnoService,
  ) {
    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`usuarios/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  // Sign in with email/password
  async signIn(email: any, password: any) {
    const credential = await this.afAuth.signInWithEmailAndPassword(email, password); 
    this.afsu.setUserData(credential.user);
    this.router.navigate(["/user/dashboard"]); 
  }

  // Sign up with email/password
  async signUp(user: any) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
    if (!credential.user) {
      throw new Error("Error al crear la cuenta con este email/contraseña.");
    }
    const newdata = Object.assign(user, credential.user);
    this.sendVerificationMail();
    //this.setNewUserData(credential.user);
    this.afsu.createOrUpdateUser(newdata);
  }

  //Sign up for voluntary
  async signUpForVoluntary(user: any) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
    if (!credential.user) {
      throw new Error("Error al crear la cuenta con este email/contraseña.");
    }
    const newdata = Object.assign(user, credential.user);
    this.sendVerificationMail();
    this.afsu.createOrUpdateUser(newdata);
    this.afsdv.createOrUpdateDataVoluntario(newdata);
  }
  //Sign up for alumno
  async signUpForStudent(user: any) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
    if (!credential.user) {
      throw new Error("Error al crear la cuenta con este email/contraseña.");
    }
    const newdata = Object.assign(user, credential.user);
    this.sendVerificationMail();
    
    this.afsu.createOrUpdateUser(newdata);
    this.afsda.createOrUpdateDataAlumno(newdata);
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.afsu.setUserData(credential.user);
  }
  // Reset Forggot password
  forgotPassword(passwordResetEmail: any) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert("Password reset email sent, check your inbox.");
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Send email verfificaiton when new user sign up
  async sendVerificationMail() {
    let user = await this.afAuth.currentUser;
    if (user) {
      await user.sendEmailVerification();
      this.router.navigate(["/verify-email-address"]);
    }
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(["/login"]);
  }
}
