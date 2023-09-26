import { Component, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.less']
})
export class AwardsComponent {
  awards:{name:string,link:string,l?:any,t?:string}[]=[
    {name:"TCS - Star of Month Award",link:"assets/files/tcs-star-of-the-month.jpg"},
    {name:"Deloitte - Spot Award",link:"assets/files/deloitte-spot.jpg"},
    {name:"Deloitte - Outstanding Award",link:"assets/files/deloitte-outstanding.jpg"},
    {name:"Oracle - Java Associate",link:"assets/files/oracle-java-cert1.jpg"},
    {name:"Oracle - Java Professional",link:"assets/files/oracle-java-cert2.jpg"},
    {name:"Mongo DB - Certitifaction",link:"assets/files/udemy-mongodb.jpg"},
    {name:"Microsoft Azure - Fudamentals",link:"assets/files/az-900.png"},
  ];

  constructor(private sanitizer:DomSanitizer){
    this.awards.forEach(a=>{
      a.l=this.sanitizer.bypassSecurityTrustResourceUrl(a.link);
      if(a.link.includes(".jpg")){
        a.t="image/jpeg";
      }
      else if(a.link.includes(".png")){
        a.t="image/png";
      }
    })
  }

  open(a:any){
    window.open(window.location.href+a.link,"_blank");
  }

}
