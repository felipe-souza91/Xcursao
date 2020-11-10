import { AngularFireAuth } from '@angular/fire/auth';
import { Avaliacao } from './../interfaces/avaliacao';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {
  private avaliacaoCollection: AngularFirestoreCollection<Avaliacao>;

  constructor(private afs: AngularFirestore,
  ) {
    this.avaliacaoCollection = this.afs.collection<Avaliacao>('Avaliacao');
  }

  getPrincipais(email: string) {
    this.avaliacaoCollection = this.afs.collection<Avaliacao>('Avaliacao', ref => ref.where('email','==', email));
    return this.avaliacaoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }

  getPrincipaisBusca(nome: string, email: string) {
    
    this.avaliacaoCollection = this.afs.collection<Avaliacao>('Avaliacao', ref => ref.where('local', '==', nome).where('email', '==', email));
    return this.avaliacaoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }

  addXAvaliacao(avaliacao: Avaliacao) {
    return this.avaliacaoCollection.add(avaliacao);
  }

  deleteAvaliação(id: string) {
    return this.avaliacaoCollection.doc<Avaliacao>(id).delete();
  }
}
