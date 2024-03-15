import { Component } from '@angular/core';
import { Page } from '../page/page.component';
import { Collections, FirestoreService } from '../firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.less']
})
export class PagesComponent {

  pages:Page[] = [];

  constructor(public firestore:FirestoreService, public router:Router){

  }


  ngOnInit(): void {
    if(this.firestore.data[Collections.PAGES]==null){
      this.firestore.loader.show();
      this.firestore.refreshEvent.subscribe(collection=>{
        if(collection==Collections.PAGES){
          this.firestore.loader.hide();
          this.refresh();
        }
      });
    }else{
      this.refresh();
    }
  }

  refresh(){
    this.pages = this.firestore.data[Collections.PAGES];
  }

  navigate(p:Page){
    this.router.navigateByUrl("pages/"+p.id);
  }
}
