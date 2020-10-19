import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/interfaces/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<User>;
  
  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore
    ) {  this.userCollection = this.afs.collection<User>('Users');
  }

    getUsers() {
      return this.userCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      )
    }

  login(user: User){
    return this.afa.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  logout(){
    return this.afa.auth.signOut();
  }

  register(user: User){
   

    return this.afa.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  getAuth(){
    return this.afa.auth;
  }
  getUser(id: string) {
    return this.userCollection.doc<User>(id).valueChanges();
  }

  updateUser(id: string, user) {
    return this.userCollection.doc<User>(id).update(user);

  }

  deleteUser(id: string) {
    return this.userCollection.doc<User>(id).delete();
  }
  

}
