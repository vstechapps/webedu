import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { User, UserCourse, CourseSubject } from '../models/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  userCourses:any={};
  userActivity:any={};
  constructor(public firestore: FirestoreService) {
    if(firestore.user.role=="USER" && firestore.user.courses!=null){
      this.loadUserDashboard(firestore.user.courses);
    }
    if(firestore.user.role=="ADMIN"){
      this.loadAdminDashboard();
    }
  }

  ngOnInit(): void {
  }

  loadAdminDashboard(){

  }



  loadUserDashboard(courses:UserCourse[]){
    let averageDuration=0;
      courses.forEach((course:UserCourse)=>{
        if(this.userCourses[course.status]==null){
          this.userCourses[course.status]=[course];
        }else{
          this.userCourses[course.status].push(course);
        }
        if(course.status=="COMPLETED"){
          let deviation=course.duration-(Math.abs(new Date(course.completed).getTime()-new Date(course.started).getTime())/(1000 * 3600 * 24));
          if(deviation<0)deviation=0;
          averageDuration+=deviation;
        }
      });
      if(this.userCourses["COMPLETED"]!=null)
      this.userActivity["OnTime"]=averageDuration/this.userCourses["COMPLETED"].length;
  }

}
