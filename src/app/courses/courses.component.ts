import { Component, OnInit } from '@angular/core';
import { Course } from '../models/models';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.less']
})
export class CoursesComponent implements OnInit {


  course:Course={name:"",subject:"",duration:"",questions:[]};
  constructor(public firestore:FirestoreService) {

   }

  ngOnInit(): void {
  }

  addCourse(){
    if(this.validate())this.firestore.courseRef.add(this.course);
  }

  deleteCourse(course:Course){
    this.firestore.courseRef.doc(course.id).delete();
  }

  validate(){
    console.log(this.course);
    return this.course.name!="" && this.course.subject!="" && this.firestore.subjects.indexOf(this.course.subject)>-1;
  }

}
