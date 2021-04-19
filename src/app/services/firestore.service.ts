import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User, UserCourse, CourseSubject } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  user:UserData;
  userRef:AngularFirestoreCollection<User>;
  userCourseRef:AngularFirestoreCollection<UserCourse>;
  subjectRef:AngularFirestoreCollection<CourseSubject>;

  constructor(public firestore:AngularFirestore) {
    this.userRef = this.firestore.collection<User>('users');
    this.userCourseRef= this.firestore.collection<UserCourse>('user-courses');
    this.subjectRef=this.firestore.collection<CourseSubject>("subjects");
  }

  setUser(user:User){
    this.user=user;
    if(this.user!=null && this.user.id!=null){
      this.firestore.collection<UserCourse>("user-courses",ref=>ref.where("user","==",this.user.id))
      .valueChanges().subscribe(res=>{
        console.log("Refreshing the Courses for User "+this.user.id);
        this.user.courses=res;
      });
    }
  }

}

export class UserData extends User{
  courses?:UserCourse[];

}
