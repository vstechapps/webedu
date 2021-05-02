import { Component, OnInit } from '@angular/core';
import { Course, UserCourse, CourseStatus } from '../models/models';
import { FirestoreService } from '../services/firestore.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.less']
})
export class CourseComponent implements OnInit {

  courseId:string;
  course:Course;
  userCourse:UserCourse;

  constructor(public firestore:FirestoreService,private route: ActivatedRoute,private router:Router) {

   }

  ngOnInit(): void {
    this.courseId=this.route.snapshot.paramMap.get('id')
    if(this.courseId==null)this.router.navigate(["dashboard"]);
    this.firestore.courseRef.doc(this.courseId).valueChanges().subscribe((course:Course)=>this.course=course);
    this.firestore.user.courses.filter(usercourse=>usercourse.course==this.courseId).map(course=>this.userCourse=course);
  }

  register(){
    this.firestore.userCourseRef.add({user:this.firestore.user.id,course:this.courseId,status:CourseStatus.InProgress,started:(new Date()).toLocaleDateString(),duration:this.course.duration});
  }



}
