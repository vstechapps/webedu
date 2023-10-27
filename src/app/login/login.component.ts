import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Firestore } from 'firebase/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  constructor(public fs: FirestoreService){

  }

  login(){
    
  }

}
