import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { Events } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Event } from 'src/app/interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventCollection: AngularFirestoreCollection<Event>;
 
  

  constructor(private afs: AngularFirestore) { 
    this.eventCollection = this.afs.collection<Event>('Event');
  }

  geteventTotal() {
 
    return this.eventCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }


addevent(event: Event){
return this.eventCollection.add(event);
 
}
}