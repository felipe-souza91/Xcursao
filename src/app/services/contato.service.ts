import { Contato } from './../interfaces/contato';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
   private contatosCollection: AngularFirestoreCollection<Contato>;

  constructor( private afs: AngularFirestore) { 
   

    this.contatosCollection = this.afs.collection<Contato>('Contato');
  }
  getContato(){
    return this.contatosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }

  addContato(contato: Contato){
    return this.contatosCollection.add(contato);
  }

  deletarContato(id: string){
    return this.contatosCollection.doc<Contato>(id).delete();
  }
}

