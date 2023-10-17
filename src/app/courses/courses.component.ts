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
  this.courses = this.firestore.data[Collections.COURSES];
  this.categories = this.firestore.data[Collections.CATEGORIES];
}

addCourse(){
  console.log(this.course);
  if(this.validate()){
    addDoc(this.firestore.coursesCollection,this.course).then((ref:DocumentReference)=>{
      alert("Course has been added succesfully ID:"+ref.id);
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

