import { Component } from '@angular/core';
import { Course } from '../app.model';
import { Collections, FirestoreService } from '../firestore.service';
import { NavigationEnd, Router } from '@angular/router';

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

expand={d1:true,d2:true,d3:true}

constructor(public firestore:FirestoreService, private router:Router){
  if(this.firestore.data[Collections.COURSES]!=null){
    this.courses = this.firestore.data[Collections.COURSES];
    this.sortOrder();
  }
  this.firestore.refreshEvent.subscribe(collection=>{
    if(collection==Collections.COURSES){
      this.courses = this.firestore.data[Collections.COURSES];
      this.sortOrder();
    }
  });
  this.router.events.subscribe(e=>{
    if(e instanceof NavigationEnd){
      this.updateView(this.router.url);
    }
  })
}

sortOrder(){
  this.courses = this.courses.sort((a,b)=>a.order-b.order);
  this.design = this.courses.filter(c=>c.category=="design");
  this.develop = this.courses.filter(c=>c.category=="develop");
  this.deploy = this.courses.filter(c=>c.category=="deploy");
  //this.updateView(this.router.url);
}

updateView(url:string){
  let focus=url && url.includes("/home/")?url.replace("/home/",""):null;
  if(focus){
    switch(focus){
      case "design":
        this.expand={d1:true,d2:false,d3:false};
        break;
      case "develop":
        this.expand={d1:false,d2:true,d3:false};
        break;
      case "deploy":
        this.expand={d1:false,d2:false,d3:true};
        break;
      default:
        break;
    }
  }
}

}



