import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Menu } from '../models/models';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  menus:Menu[]=[];

  constructor(public auth: AngularFireAuth,service:FirestoreService) {
    /*service.menuRef.valueChanges().subscribe(res=>{
      this.menus=res;
    });*/
    this.menus.push({"name":"Login","click":"this.login()"})
    this.auth.authState.subscribe(res=>{
      console.log(res);
    });
   }

  ngOnInit(): void {

  }

  click(text:string){
    eval(text);
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

}
