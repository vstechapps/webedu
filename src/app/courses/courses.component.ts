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
  course:Course={name:"",subject:"",duration:7};
  constructor(public firestore:FirestoreService) {
    this.firestore.courseRef.snapshotChanges().subscribe(res=>
      this.courses=res.map(a=>{let d:Course=a.payload.doc.data();d.id=a.payload.doc.id;return d;}));
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
