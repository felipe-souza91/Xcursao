import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { map } from 'rxjs/operators';
import { Galyphoto } from 'src/app/interfaces/galyphoto';

@Injectable({
  providedIn: 'root'
})
export class GaleryPhotosService {

private galeryphotoCollection: AngularFirestoreCollection<Galyphoto>;

  constructor(private afs: AngularFirestore) {

    this.galeryphotoCollection = this.afs.collection<Galyphoto>('GaleryPhoto');

   }

   getgaleryPhoto() {
    return this.galeryphotoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }

   addgaleryphoto(photo: Galyphoto){
    return this.galeryphotoCollection.add(photo);
    }

    updategaleryphoto(id: string, Galyphoto) {
      return this.galeryphotoCollection.doc<Galyphoto>(id).update(Galyphoto);
    }

    deletegaleryphoto(id: string) {
      return this.galeryphotoCollection.doc<Galyphoto>(id).delete();
    }
}
