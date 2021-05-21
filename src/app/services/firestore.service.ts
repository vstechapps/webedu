import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User, UserCourse, CourseSubject, Course } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  user: UserData;
  userRef: AngularFirestoreCollection<User>;
  userCourseRef: AngularFirestoreCollection<UserCourse>;
  subjectRef: AngularFirestoreCollection<CourseSubject>;
  courseRef: AngularFirestoreCollection<Course>;
  courses: Course[];
  subjects: string[] = [];

  constructor(public firestore: AngularFirestore) {
    this.userRef = this.firestore.collection<User>('users');
    this.userCourseRef = this.firestore.collection<UserCourse>('user-courses');
    this.subjectRef = this.firestore.collection<CourseSubject>("subjects");
    this.courseRef = this.firestore.collection<Course>("courses");
  }

  setUser(user: User) {
    this.user = user;
    if (this.user != null && this.user.id != null) {
      this.firestore.collection<UserCourse>("user-courses", ref => ref.where("user", "==", this.user.id))
        .snapshotChanges().subscribe(res => {
          console.log("Refreshing the Courses for User " + this.user.id);
          this.user.courses = res.map(a => { let d: UserCourse = a.payload.doc.data(); d.id = a.payload.doc.id; return d; });
        });
    }
    this.courseRef.snapshotChanges().subscribe(res =>
      this.courses = res.map(a => { let d: Course = a.payload.doc.data(); d.id = a.payload.doc.id; return d; }));
    this.subjectRef.valueChanges().subscribe(res => res.forEach(s => this.subjects.push(s.name)));
    this.updateServiceWorker();
  }

  getCourseName(userCourse: UserCourse) {
    let course = this.courses.filter(course => course.id == userCourse.course)[0];
    return course != null ? course.name : "";
  }

  updateServiceWorker() {
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function (reg) {
        if (reg) {
          reg.showNotification(this.user.name + ", WebEdu Welcomes you onboard");
          reg.dispatchEvent(new Event("user", this.user));
        }
      });
    }
  }

}

export class UserData extends User {
  courses?: UserCourse[];

}
