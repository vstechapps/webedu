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
    });
    this.firestore.userCourseRef.valueChanges().subscribe(res => {
      this.userCourses = res;
    });
  }

  ngOnInit(): void {
  }

  courseCount(user:UserData){
    return this.userCourses.filter(usercourse=>usercourse.user==user.id).length;
  }

}
