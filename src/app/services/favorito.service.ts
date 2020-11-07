import { Favoritos } from './../interfaces/favoritos';
import { Injectable } from '@angular/core';
import { Xcursion } from 'src/app/interfaces/xcursion';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FavoritoService {
  

  private favoritaCollection: AngularFirestoreCollection<Favoritos>;
  constructor(
    
    private afs: AngularFirestore
    ) {

      this.favoritaCollection = this.afs.collection<Favoritos>('Favoritos');
   }

   getfavorito(id: string) {
    
    return this.favoritaCollection.doc<Favoritos>(id).valueChanges();
  }

   getFavoritos(email: string) {
    this.favoritaCollection = this.afs.collection<Favoritos>('Favoritos', ref => ref.where('email', '==', email));
    return this.favoritaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
   }

   getFavoritoLocal(email: string, search: string ) {
    this.favoritaCollection = this.afs.collection<Favoritos>('Favoritos', ref => ref.where('email', '==', email).where('nome', '==', search));
    return this.favoritaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
   }
   addFavorito(xcursion: Favoritos){
    return this.favoritaCollection.add(xcursion);
   }
   
   deleteFavorito(id: string){
    return this.favoritaCollection.doc<Favoritos>(id).delete();
  }
}
