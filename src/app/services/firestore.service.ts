import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  user:User;
  userRef:AngularFirestoreCollection<User>;
  constructor(firestore:AngularFirestore) {
    this.userRef = firestore.collection<User>('users');
  }
}
