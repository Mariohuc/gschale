import { Injectable } from "@angular/core";
import { firestore } from "firebase/app";
import { Curso } from "../models/curso";

import {
  AngularFirestore,
} from "@angular/fire/firestore";

@Injectable({ providedIn: "root" })
export class CursoService {
  constructor(private afs: AngularFirestore) {}

  getOneCurso(cursoUID: string) {
    return this.afs.doc<Curso>(`cursos/${cursoUID}`).snapshotChanges();
  }

  getAllCursos() {
    return this.afs.collection('cursos').snapshotChanges();
  }

  addCurso(curso: Curso){
    return this.afs.collection('cursos').add(curso);
  }

  updateCurso(curso: Curso){
    delete curso.uid;
    this.afs.doc('cursos/' + curso.uid).update(curso);
  }

  deleteCurso(cursoUID: string){
    this.afs.doc(`cursos/${cursoUID}`).delete();
  }
}