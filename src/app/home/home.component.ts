import { Component } from '@angular/core';
import { Utility } from '../app-util';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  isMobile:boolean = Utility.mobileAndTabletCheck();
  menu: boolean = !this.isMobile;

  constructor(private router:Router){
    var redirect = sessionStorage.getItem("redirect");
    if(redirect){
      sessionStorage.removeItem("redirect");
      this.router.navigateByUrl(redirect);
    }
  }

 


}
