import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Menu } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  menuRef:AngularFirestoreCollection<Menu>;
  constructor(firestore:AngularFirestore) {
    this.menuRef = firestore.collection<Menu>('menus', ref => ref.orderBy('order'));
  }
}
