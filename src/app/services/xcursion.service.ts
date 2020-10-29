import { Xcursion } from 'src/app/interfaces/xcursion';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class XcursionService {
  private xcursionsCollection: AngularFirestoreCollection<Xcursion>;


  constructor(
    private afs: AngularFirestore) {
    
  }

  getXcursions(search: string) {
    this.xcursionsCollection = this.afs.collection<Xcursion>('Xcursions', ref => ref.where('nome', '==', search));
    return this.xcursionsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }
 

  
  getXcursionsTotal(email:string) {

    if(email != null){

    
    this.xcursionsCollection = this.afs.collection<Xcursion>('Xcursions', ref => ref.where('email', '==', email));
    return this.xcursionsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
         
          return { id, ...data };
        });
      })
    )
    }else{
      this.xcursionsCollection = this.afs.collection<Xcursion>('Xcursions');
    return this.xcursionsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
         
          return { id, ...data };
        });
      })
    )

    }
  }

 
  
  addXcursion(xcursion: Xcursion) {
    return this.xcursionsCollection.add(xcursion);
  }
  getXcursion(id: string) {
    return this.xcursionsCollection.doc<Xcursion>(id).valueChanges();
  }
  updateXcursion(id: string, xcursion) {
    return this.xcursionsCollection.doc<Xcursion>(id).update(xcursion);
  }
  deleteXcursion(id: string) {
    return this.xcursionsCollection.doc<Xcursion>(id).delete();
  }
}
