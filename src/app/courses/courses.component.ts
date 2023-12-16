import { Component } from '@angular/core';
import { Category, Course } from '../app.model';
import { DocumentReference, addDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { Collections, FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.less']
})
export class CoursesComponent {

  addCourseModal:boolean=false;
  course:Course = {name:"",description:"",image:"",category:"",active:true};
  categories:Category[]=[];

  courses:Course[]=[];

  deleteConfirm:boolean=false;

constructor(public firestore:FirestoreService){
  this.categories=this.firestore.data[Collections.CATEGORIES];
  this.setCourses(this.firestore.data[Collections.COURSES]);
  this.firestore.refreshEvent.subscribe(collection=>{
    if(collection==Collections.CATEGORIES){
      this.categories=this.firestore.data[Collections.CATEGORIES];
    }
    if(collection=Collections.COURSES){
      this.setCourses(this.firestore.data[Collections.COURSES]);
      
    }
  })
}

setCourses(courses:Course[]){
  if(courses==undefined) return;
  this.courses = courses.filter((c: any) => c.active == true);
  if (this.firestore.isAdmin) {
    this.courses = courses;
  }
}

addCourse(){
  console.log(this.course);
  if(this.validate()){
    addDoc(this.firestore.coursesCollection,this.course).then((ref:DocumentReference)=>{
      alert("Course has been added succesfully ID:"+ref.id);
      this.firestore.refresh(Collections.COURSES);
    });
  }
  else{
    alert("Please enter name, description, category");
  }
  
}

validate(){
  return this.isNotEmpty(this.course.name) && this.isNotEmpty(this.course.description) && this.isNotEmpty(this.course.category);
}

isNotEmpty(str:string){
  return str!=null && str!="";
}


}

