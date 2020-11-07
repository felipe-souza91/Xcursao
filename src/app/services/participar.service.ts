import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { Participar } from './../interfaces/participar';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParticiparService {
  private participaCollection: AngularFirestoreCollection<Participar>;
  constructor(
    private afs: AngularFirestore,
  ) {
    this.participaCollection = this.afs.collection<Participar>('Participar');
  }

  getParticipar(email: string) {
    this.participaCollection = this.afs.collection<Participar>('Participar', ref => ref.where('email', '==', email));
    return this.participaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }

  getParticiparSeach(email: string, seach: string) {
    this.participaCollection = this.afs.collection<Participar>('Participar', ref => ref.where('email', '==', email).where('nome', '==', seach));
    return this.participaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }

  addParticipacao(participar: Participar) {
    return this.participaCollection.add(participar);
  }

  deletarParticipacao(id: string) {
    return this.participaCollection.doc<Participar>(id).delete();
  }

  getParticiparId(id: string) {
    return this.participaCollection.doc<Participar>(id).valueChanges();
  }
}
