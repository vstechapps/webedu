import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { User } from '../models/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  user:User=undefined;

  constructor(public firestore: FirestoreService) {
     this.user=this.firestore.user;
  }

  ngOnInit(): void {
  }

}
