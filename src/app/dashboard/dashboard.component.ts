import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent {

  html: string = "";
  constructor(public firestore:FirestoreService, private router:Router){
    
  }
}
