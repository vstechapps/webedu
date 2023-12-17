import { Component, OnInit } from '@angular/core';
import { Course, Topic } from '../app.model';
import { Collections, FirestoreService } from '../firestore.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.less']
})
export class CourseComponent implements OnInit{

  course?:Course;
  courses:Course[] = [];
  id:string | null = null;
  topics:Topic[]=[];

  constructor(public firestore:FirestoreService,private route: ActivatedRoute){
    

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    if(this.firestore.data[Collections.COURSES]!=null){
      this.courses = this.firestore.data[Collections.COURSES];
      this.course = this.courses.filter(p=>p.id==this.id)[0];
      this.setTopics();
    }
    this.firestore.refreshEvent.subscribe(collection=>{
      if(collection==Collections.COURSES){
        this.courses = this.firestore.data[Collections.COURSES];
        this.course = this.courses.filter(p=>p.id==this.id)[0];
        this.setTopics();
      }
    });
  }

  setTopics(){
    this.topics = this.firestore.data[Collections.TOPICS];
  }
}
