import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {

  navs=[{
    title:"V.V.S.K",
    route:""
  },{
    title:"ECM",
    route:"ecm"
  }];
  

  cards=[{
    name:"Content Repo",
    icon:"folder_open",
  },{
    name:"Create Content",
    icon:"edit_note"
  },{
    name:"Review Content",
    icon:"rate_review"
  },{
    name:"Model Manager",
    icon:"data_object",
    role:"SUPER_ADMIN"
  },{
    name:"Manage Roles",
    icon:"supervisor_account",
    role:"SUPER_ADMIN"
  }]

  

  demo(){
    window.postMessage("DemoMessage");
  }

}
