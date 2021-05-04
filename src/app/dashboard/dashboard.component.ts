import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { UserCourse, CourseStatus } from '../models/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  userActivity:any={};
  constructor(public firestore: FirestoreService) {
    this.userActivity["OnTime"]=70;
  }

  ngOnInit(): void {
  }

  courseCount(courses:UserCourse[],status:string){
    return courses.filter(course=>course.status==status).length;
  }

}
