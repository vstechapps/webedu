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
    Notification.requestPermission(function (status) {
      console.log('Notification permission status:', status);
      Notification.permission == "granted" ? this.toaster.success("Success", "Notifications Enabled") : this.toaster.error("Failed", "Notifications Blocked");
    });
  }

}
