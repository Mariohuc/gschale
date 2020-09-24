import { Injectable } from "@angular/core";
import { firestore } from "firebase/app";

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";

@Injectable({ providedIn: "root" })
export class AsesoriaVoluntarioService {
  constructor(private afs: AngularFirestore) {}

  getOneAV(voluntaryUID: string) {
    return this.afs.doc(`asesorias_voluntarios/${voluntaryUID}`).snapshotChanges();
  }

  getAllAV() {
    return this.afs.collection('asesorias_voluntarios').snapshotChanges();
  }

  createOrUpdateAsesoriaVoluntario( voluntaryUID: string , elements: string[] ){
    //data.uid es el identificador de un usuario existente.
    const itemRef: AngularFirestoreDocument<any> = this.afs.doc(`asesorias_voluntarios/${voluntaryUID}`);
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

  deleteCamposDeAV( voluntaryUID: string , elements: string[] ){
    const itemRef = this.afs.doc(`asesorias_voluntarios/${voluntaryUID}`);
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

  deleteAsesoriaVoluntario(voluntaryUID: string){
    this.afs.doc(`asesorias_voluntarios/${voluntaryUID}`).delete();
  }
}