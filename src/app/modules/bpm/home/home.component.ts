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
    title:"BPM",
    route:"bpm"
  }];
  

  cards=[{
    name:"Configure Environment",
    icon:"folder_open",
  },{
    name:"Create Workflow",
    icon:"edit_note"
  },{
    name:"Manage Roles",
    icon:"supervisor_account",
    role:"SUPER_ADMIN"
  }]

  
  demo(){
    window.postMessage("DemoMessage");
  }
}
