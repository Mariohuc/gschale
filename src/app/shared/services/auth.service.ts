import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../models/user";

import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";

import { Observable, of } from "rxjs";
import { switchMap, take, map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthService {
  user$: Observable<User | null | undefined>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`/usuarios/${user.uid}`).valueChanges();
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
    //this.setUserData(credential.user);
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
    this.setNewUserData(newdata);
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

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  /* setUserData(user:any) {
    const itemRef = this.afs.object(`/usuarios/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return itemRef.update(userData);
  } */

  doesUserExist(user_uid: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const user = this.afs
        .doc<User>(`/usuarios/${user_uid}`)
        .snapshotChanges();
      user.pipe(
        take(1),
        map((user) => {
          if (!!user) {
            resolve(true);
          }
          resolve(false);
        })
      );
    });
  }

  async setNewUserData(user: any) {
    /* if( (await this.doesUserExist(user.uid)) ){
      throw new Error("Existe el usuario");
    } */
    const itemRef: AngularFirestoreDocument<User> = this.afs.doc(`/usuarios/${user.uid}`);
    const userData = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      dni: user.dni, // of user input
      nombres: user.nombres, // of user input
      apellidos: user.apellidos, // of user input
      fecha_nacimiento: user.fecha_nacimiento, // of user input
      numero_celular: user.numero_celular, // of user input
      fecha_registro: user.metadata.creationTime, // of firebase
      rol: user.rol,
      activo: user.activo,
    };
    return itemRef.set(userData, { merge: true });
    //return this.setUserData(user);
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
