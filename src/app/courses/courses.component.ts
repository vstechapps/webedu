import { Component } from '@angular/core';
import { Course } from '../app.model';
import { DocumentReference, addDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.less']
})
export class CoursesComponent {

  addCourseModal:boolean=false;
  course:Course = {name:"",description:"",image:"",category:"",active:true};

  courses:Course[]=[];

constructor(public firestore:FirestoreService){
  const q = query(this.firestore.coursesCollection, where("active", "==", true));
  getDocs(q).then(res=>
    res.forEach(doc=>
      {
        let d:any = doc.data();
        this.courses.push(d);
      })
  );
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

