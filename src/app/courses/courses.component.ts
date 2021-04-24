import { Component, OnInit } from '@angular/core';
import { Course, CourseSubject } from '../models/models';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.less']
})
export class CoursesComponent implements OnInit {

  courses:Course[];
  subjects:string[]=[];
  course:Course={name:"",subject:"",topics:[]};
  constructor(public firestore:FirestoreService) {
    this.firestore.courseRef.valueChanges().subscribe(res=>this.courses=res);
    this.firestore.subjectRef.valueChanges().subscribe(res=>res.forEach(s=>this.subjects.push(s.name)));
   }

  ngOnInit(): void {
  }

  addCourse(){
    if(this.validate())this.firestore.courseRef.add(this.course);
  }

  validate(){
    console.log(this.course);
    return this.course.name!="" && this.course.subject!="" && this.subjects.indexOf(this.course.subject)>-1;
  }

}
