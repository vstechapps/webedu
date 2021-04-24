import { Component, OnInit } from '@angular/core';
import { FirestoreService, UserData } from '../services/firestore.service';
import { User, UserCourse } from '../models/models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {

  users:UserData[];
  constructor(public firestore:FirestoreService) {
    this.firestore.userRef.valueChanges().subscribe(res=>{
      this.users=res;
      this.firestore.userCourseRef.valueChanges().subscribe(res=>{
        let usercourses:UserCourse[]=res;
        usercourses.forEach(usercourse=>{
          this.users.forEach(user=>{
            if(usercourse.user==user.id){
              if(user.courses==null)user.courses=[];
              user.courses.push(usercourse);
            }
          });
        });
      })
    });
   }

  ngOnInit(): void {
  }

}
