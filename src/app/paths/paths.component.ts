import { Component } from '@angular/core';

@Component({
  selector: 'app-paths',
  templateUrl: './paths.component.html',
  styleUrls: ['./paths.component.less']
})
export class PathsComponent {

paths:Path[] = PATHS;

}

export const PATHS:Path[]=[{
  id:"1",
  name:"Fullstack (Java + Angular)",
  tech:"Java, Angular, REST API, Microservices, SPA",
  topics:[]
},{
  id:"2",
  name:"Fullstack (Java + React)",
  tech:"Java, React, REST API, Microservices, SPA",
  topics:[]
},{
  id:"3",
  name:"Fullstack (Python)",
  tech:"Python, Django, MySQL, UI, Web App using python",
  topics:[]
},{
  id:"4",
  name:"MEAN Stack",
  tech:"Mongo, Express.js, Angular, Node JS",
  topics:[]
},{
  id:"5",
  name:"MERN Stack",
  tech:"Mongo, Express.js, React, Node JS",
  topics:[]
},{
  id:"6",
  name:"Cloud Engineer (AWS)",
  tech:"EC2, VPN, RDS, S3, ALB",
  topics:[]
},];


export interface Path{
  id:string,
  name:string;
  tech:string;
  topics:Topic[];
}

export interface Topic{
  name:string;
  course:string;
  order:string;
}
