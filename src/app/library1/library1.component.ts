import { Component } from '@angular/core';

@Component({
  selector: 'app-library1',
  templateUrl: './library1.component.html',
  styleUrls: ['./library1.component.less']
})
export class Library1Component {

  books=[{
    name:"Active Directory Federation Services",
    about:"Integration of AD FS and OAuth",
    link:"assets/files/adfs-oauth.pdf"
  },{
    name:"Spring Security",
    about:"Spring Security and OAuth 2.0",
    link:"assets/files/spring-security.pdf"
  }];

  open(b:any){
    window.open(window.location.href+"/"+b.link,"_blank");
  }
}
