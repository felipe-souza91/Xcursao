import { User } from './../interfaces/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private xcursionsCollection: AngularFirestoreCollection<User>;

    constructor(
        private afa: AngularFireAuth,
        private afs: AngularFirestore
      

        ) {
            

         }

         

    login(user: User) {
        return this.afa.auth.signInWithEmailAndPassword(user.email, user.password);
    }


    logout() {
        return this.afa.auth.signOut();
    }

    getAuth() {
        return this.afa.auth;
    }

    getLogin(id: string) {
        return this.xcursionsCollection.doc<User>(id).valueChanges();
      }

   
}
