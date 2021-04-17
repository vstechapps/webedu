import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  user:any=undefined;

  constructor(public auth: AngularFireAuth) {
     this.auth.authState.subscribe(res=>{
      if(res!=null){
        this.user=res;
      }
   });
  }

  ngOnInit(): void {
  }

}
