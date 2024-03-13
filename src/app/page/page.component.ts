import { Component } from '@angular/core';
import { Collections, FirestoreService } from '../firestore.service';
import { ActivatedRoute, ɵEmptyOutletComponent } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.less']
})
export class PageComponent {
  
  page?:Page;

  constructor(public route:ActivatedRoute, public firestore:FirestoreService){

  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    console.log("Loading Page: "+id);
    if(id){
      if(this.firestore.data[Collections.PAGES]==null){
        this.firestore.loader.show();
        this.firestore.refreshEvent.subscribe(collection=>{
          if(id && collection==Collections.PAGES){
            this.firestore.loader.hide();
            this.refresh(id);
          }
        });
      }else{
        this.refresh(id);
      }
    }
  }


  refresh(id:string){
    var page = this.firestore.fetch(Collections.PAGES,"id",id);
    if(page){
      console.log(page);
      this.page = page;
      if(!page.header){window.postMessage("ToggleHeader");}
      if(page.script){eval(page.script);}
      if(page.style){
        var s = document.createElement("style");
        s.innerText = page.style;
        document.head.appendChild(s);
      }
    }
  }

}

export interface Page{
  id:string;
  name:string;
  header?:boolean;
  html?:string;
  script?:string;
  style?:string;
}
