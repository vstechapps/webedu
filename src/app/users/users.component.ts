import { Component, OnInit } from '@angular/core';
import { FirestoreService, UserData } from '../services/firestore.service';
import { User, UserCourse } from '../models/models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {

  users: UserData[];
  userCourses: UserCourse[]=[];
  constructor(public firestore: FirestoreService) {
    this.firestore.userRef.valueChanges().subscribe(res => {
      this.users = res;
      this.refresh();
    });
    this.firestore.userCourseRef.snapshotChanges().subscribe(res => {
      this.userCourses = res.map(a=>{let d:UserCourse=a.payload.doc.data();d.id=a.payload.doc.id;return d;});
      this.refresh();
    });
  }

  ngOnInit(): void {
  }

  refresh(){
    this.users.forEach(user=>{
      user.courses=this.userCourses.filter(course=>course.user==user.id);
    });
  }

  resetCourse(userCourse:UserCourse){
    this.firestore.userCourseRef.doc(userCourse.id).delete();
  }

  deleteUser(user:User){
    this.firestore.userRef.doc(user.id).delete().then(()=>alert(user.name+" is deleted"));
  }

}
