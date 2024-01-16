import { Component } from '@angular/core';
import { Course } from '../app.model';
import { Collections, FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.less']
})
export class CoursesComponent {

design:Course[] = [];
develop:Course[] = [];
deploy:Course[] = [];
courses:Course[] = [];

constructor(public firestore:FirestoreService){
  if(this.firestore.data[Collections.COURSES]!=null){
    this.courses = this.firestore.data[Collections.COURSES];
    this.sortOrder();
  }
  this.firestore.refreshEvent.subscribe(collection=>{
    if(collection==Collections.COURSES){
      this.courses = this.firestore.data[Collections.COURSES];
      this.sortOrder();
      this.design = this.courses.filter(c=>c.category=="design");
      this.develop = this.courses.filter(c=>c.category=="develop");
      this.deploy = this.courses.filter(c=>c.category=="deploy");
    }
  });
}

sortOrder(){
  this.courses = this.courses.sort((a,b)=>a.order-b.order);
}

}



