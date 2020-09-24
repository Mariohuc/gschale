import { Injectable } from "@angular/core";
import { firestore } from "firebase/app";
import { Asesoria } from "../models/asesoria";

import {
  AngularFirestore,
} from "@angular/fire/firestore";

@Injectable({ providedIn: "root" })
export class AsesoriaService {
  constructor(private afs: AngularFirestore) {}

  getOneAsesoria(asesoriaUID: string) {
    return this.afs.doc<Asesoria>(`asesorias/${asesoriaUID}`).snapshotChanges();
  }

  getAllAsesorias() {
    return this.afs.collection('asesorias').snapshotChanges();
  }

  addAsesoria(asesoria: Asesoria){
    return this.afs.collection('asesorias').add(asesoria);
  }

  updateAsesoria(asesoria: Asesoria){
    delete asesoria.uid;
    this.afs.doc('asesorias/' + asesoria.uid).update(asesoria);
  }

  deleteAsesoria(asesoriaUID: string){
    this.afs.doc(`asesorias/${asesoriaUID}`).delete();
  }
}