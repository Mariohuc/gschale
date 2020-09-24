import { Injectable } from "@angular/core";
import { firestore } from "firebase/app";

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";

@Injectable({ providedIn: "root" })
export class AsesoriaAlumnoService {
  constructor(private afs: AngularFirestore) {}

  getOneAA(studentUID: string) {
    return this.afs.doc(`asesorias_alumnos/${studentUID}`).snapshotChanges();
  }

  getAllAA() {
    return this.afs.collection('asesorias_alumnos').snapshotChanges();
  }

  createOrUpdateAsesoriaAlumno( studentUID: string , elements: string[] ){
    //data.uid es el identificador de un usuario existente.
    const itemRef: AngularFirestoreDocument<any> = this.afs.doc(`asesorias_alumnos/${studentUID}`);
    /**
     * El array elements contiene ids que son identificadores de asesorias exsitentes.
     * elements almacena todo los uid o ids de las asesorias donde el voluntario asesora
     */
    let data = {};
    for( let i=0; i < elements.length; i++ ){
      data[elements[i]] = true
    }
    return itemRef.set(data, { merge: true });
  }

  deleteCamposDeAA( studentUID: string , elements: string[] ){
    const itemRef = this.afs.doc(`asesorias_alumnos/${studentUID}`);
    /**
     * El array elements contiene ids que son identificadores de asesorias exsitentes.
     * elements almacena todo los uid o ids de las asesorias donde el voluntario asesora
     */
    let toRemove = {};
    for( let i=0; i < elements.length; i++ ){
      toRemove[elements[i]] = firestore.FieldValue.delete()
    }
    return itemRef.update(toRemove);
  }

  deleteAsesoriaAlumno(studentUID: string){
    this.afs.doc(`asesorias_alumnos/${studentUID}`).delete();
  }
}