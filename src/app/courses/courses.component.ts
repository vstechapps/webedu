import { Component } from '@angular/core';
import { Course } from '../app.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.less']
})
export class CoursesComponent {

  addCourse:boolean=false;
  course:Course = {id:"",name:"",description:"",image:"",category:""};

  courses:Course[]=[
  {
    id:"1",
    name:"Physics",
    description:"",
    category:"",
    image:""
  },
  {
    id:"1",
    name:"Physics",
    description:"",
    category:"",
    image:""
  },
  {
    id:"1",
    name:"Physics",
    description:"",
    category:"",
    image:""
  },
  {
    id:"1",
    name:"Physics",
    description:"",
    category:"",
    image:""
  }
];

createCourse(){
  

}

}
