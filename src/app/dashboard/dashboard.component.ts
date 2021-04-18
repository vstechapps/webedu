import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { User, UserCourse } from '../models/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  userCourses:any;
  userActivity:any;
  constructor(public firestore: FirestoreService) {
    this.userCourses={"InProgress":[{name:"Bull shit1"},{name:"Bull shit2"}],"Completed":[{name:"Bull shit3"},{name:"Bull shit4"},{name:"Bull shit5"}]}
    this.userActivity={"Daily":25,"Weekly":50};
  }

  ngOnInit(): void {
  }

}
