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
    title:"MDM",
    route:"mdm"
  }];
  

  cards=[{
    name:"Create Table",
    icon:"backup_table"
  },{
    name:"Manage Data",
    icon:"data_object"
  },{
    name:"Manage Users",
    icon:"people",
    role:"SUPER_ADMIN"
  },{
    name:"Manage Permissions",
    icon:"supervisor_account",
    role:"SUPER_ADMIN"
  }]

  

  demo(){
    window.postMessage("DemoMessage");
  }


}
