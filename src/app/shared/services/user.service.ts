import { Injectable } from "@angular/core";
import { User } from "../models/user";

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private afs: AngularFirestore) {}

  getAllUsers() {
    return this.afs.collection('usuarios').snapshotChanges();
  }

  createOrUpdateUser( user: any ){
    const itemRef: AngularFirestoreDocument<User> = this.afs.doc(`usuarios/${user.uid}`);
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
  }
  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user:any) {
    const itemRef: AngularFirestoreDocument<User> = this.afs.doc(`usuarios/${user.uid}`);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
    };
    return itemRef.set(userData, { merge: true });
  }

  deleteUser(userUID: string){
    this.afs.doc(`usuarios/${userUID}`).delete();
  }
}