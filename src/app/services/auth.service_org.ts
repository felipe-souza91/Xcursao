import { User } from 'src/app/interfaces/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<User>;

  constructor(
    private afa: AngularFireAuth
    ) { }

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
