import { Injectable } from "@angular/core";

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";

@Injectable({ providedIn: "root" })
export class DataVoluntarioService {
  constructor(private afs: AngularFirestore) {}

  getOneDV(userUID: string){
    return this.afs.doc(`datos_voluntarios/${userUID}`).snapshotChanges();
  }

  getAllDV() {
    return this.afs.collection('datos_voluntarios').snapshotChanges();
  }

  createOrUpdateDataVoluntario( userData : any ){
    const itemRef: AngularFirestoreDocument<any> = this.afs.doc(`datos_voluntarios/${userData.uid}`);
    const dataVol = {
      uid: userData.uid,
      grado_academico: userData.grado_academico,
      carrera: userData.carrera,
      grados_de_interes: userData.grados_de_interes,
      areas_asesorias: userData.areas_asesorias,
      horas_libre_semana: userData.horas_libre_semana,
      estado_civil: userData.estado_civil,
      numero_hijos: userData.numero_hijos,
      experiencia: userData.experiencia,
      horario_test_psico : userData.horario_test_psico
    }; 
    return itemRef.set(dataVol, { merge: true });
  }

  deleteDataVoluntario(userUID: string){
    this.afs.doc(`datos_voluntarios/${userUID}`).delete();
  }
}