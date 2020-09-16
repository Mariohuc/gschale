import { Injectable } from "@angular/core";

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";

@Injectable({ providedIn: "root" })
export class DataAlumnoService {
  constructor(private afs: AngularFirestore) {}

  createOrUpdateDataAlumno( userData : any ){
    const itemRef: AngularFirestoreDocument<any> = this.afs.doc(`datos_alumnos/${userData.uid}`);
    const dataVol = {
      uid: userData.uid,
      coor_latitud_referencia: userData.coor_latitud_referencia,
      coor_longitud_referencia: userData.coor_longitud_referencia,
      nivel_actual: userData.nivel_actual,
      grado_actual: userData.grado_actual,
      tipo_colegio: userData.tipo_colegio,
      nombre_colegio: userData.nombre_colegio
    }; 
    return itemRef.set(dataVol, { merge: true });
  }
}