import { Component } from '@angular/core';
import { Utility } from '../app-utilt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  isMobile:boolean = Utility.mobileAndTabletCheck();
  menu: boolean = !this.isMobile;


}
