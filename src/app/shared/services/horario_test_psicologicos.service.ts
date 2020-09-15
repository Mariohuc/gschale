import { Injectable } from "@angular/core";

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";

@Injectable({ providedIn: "root" })
export class HorarioTestPsicoService {
  constructor(private afs: AngularFirestore) {}

  getHorarios() {
    return this.afs.collection("horarios_test_psico").snapshotChanges();
  }
}
