import { Component, OnInit } from '@angular/core';
import { Course } from '../app.model';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { Collections, FirestoreService } from '../firestore.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.less']
})
export class CourseComponent implements OnInit{

  id:string | null = null;
  course?:Course;
  page:string="";
  pageIndex:number=0;
  addPageModal:boolean = false;

  constructor(public firestore:FirestoreService,private route: ActivatedRoute){
    
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log("Course ID: "+this.id);
    var course = undefined;
    if(this.id && this.firestore.data[Collections.COURSES]!=undefined){
      course = this.firestore.data[Collections.COURSES].filter((c:any)=>c.id==this.id)[0];
    }
    if(course){
      this.course = course;
    }
  }

  async update(){
    if(this.course){
      await setDoc(doc(collection(this.firestore.firestore,Collections.COURSES), this.course.id),this.course);
    }
  }

  addPage(){

  }

}
