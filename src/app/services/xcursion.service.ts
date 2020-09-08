import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Xcursion } from '../interfaces/xcursion';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class XcursionService {
  private xcursionsCollection : AngularFirestoreCollection<Xcursion>;

  constructor(private afs:AngularFirestore) { 
    this.xcursionsCollection = this.afs.collection<Xcursion>('Xcursions');
  }

  getXcursions(){
    return this.xcursionsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id, ...data};
      });
    })
    )}

  addXcursion(xcursion:Xcursion){

  }

  getXcursion(id:String){
    
  }

  updateXcursion(id:String,xcursion:Xcursion){

  }

  deleteXcursion(id:String){

  }


}
