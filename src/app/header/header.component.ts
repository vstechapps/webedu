import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Menu } from '../models/models';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  menus:Menu[]=[];
  user:any=undefined;

  constructor(public auth: AngularFireAuth,public service:FirestoreService,public router:Router) {
    /*service.menuRef.valueChanges().subscribe(res=>{
      this.menus=res;
    });*/
    this.auth.authState.subscribe(res=>{
      if(res!=null){
        this.user=res;
        this.menus=[];
        this.menus.push({"name":"Logout","click":"this.logout()"});
        this.router.navigate(['dashboard']);
      }else{
        this.menus=[];
        this.menus.push({"name":"Login","click":"this.login()"});
        this.router.navigate(['home']);
      }
    });
   }

  ngOnInit(): void {

  }

  click(text:string){
    eval(text);
  }

  logout(){
    this.auth.signOut();
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

}
