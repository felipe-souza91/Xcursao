import { Avaliacao } from 'src/app/interfaces/avaliacao';
import { AvaliacaoApp } from './../interfaces/avaliacao-app';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AvaliacaoAppService {
  private avaliacaoAppCollection: AngularFirestoreCollection<AvaliacaoApp>;

  constructor(private afs: AngularFirestore) { 

    this.avaliacaoAppCollection = this.afs.collection<Avaliacao>('AvaliacaoApp');

  }
addAvaliacaoApp(avaliacaoApp: AvaliacaoApp){
  return this.avaliacaoAppCollection.add(avaliacaoApp);
}
deletarAvaliacaoApp(id: string){
  return this.avaliacaoAppCollection.doc<AvaliacaoApp>(id).delete();
}

}
