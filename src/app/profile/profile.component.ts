import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  editing: boolean = false;
  notifications: boolean = false;

  constructor(public firestore: FirestoreService, public toaster: ToastrService) {
    this.notifications = Notification.permission == 'granted';
  }

  ngOnInit(): void {
  }

  toggleNotifications() {
    var a=this;
    Notification.requestPermission(function (status) {
      console.log('Notification permission status:', status);
      Notification.permission == "granted" ? a.toaster.success("Success", "Notifications Enabled") : a.toaster.error("Failed", "Notifications Blocked");
    });
  }

}
