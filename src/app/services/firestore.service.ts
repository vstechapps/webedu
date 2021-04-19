import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User, UserCourse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  user:UserData;
  userRef:AngularFirestoreCollection<User>;
  userCourseRef:AngularFirestoreCollection<UserCourse>;
  constructor(firestore:AngularFirestore) {
    this.userRef = firestore.collection<User>('users');
    this.userCourseRef=firestore.collection<UserCourse>('user-courses');
  }


}

export class UserData extends User{
  courses?:UserCourse[];

}
