import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent {

  @Output()
  close = new EventEmitter();

  active:string="";

  constructor(public router:Router){
    this.active = this.router.url;
    router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.active = this.router.url
      }
    });

  }

  focus(view:string){
    this.router.navigate([view]);
    this.close.emit(true);
  }

}
