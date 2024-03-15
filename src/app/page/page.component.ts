import { Component } from '@angular/core';
import { Collections, FirestoreService } from '../firestore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { collection, doc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.less']
})
export class PageComponent {
  
  page?:Page;

  editPageModal:boolean = false;

  editPageView:string = "html";

  constructor(public router:Router,public route:ActivatedRoute, public firestore:FirestoreService){

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
    if(page && page.auth){
      this.router.navigate(["login"]);
    }
    else if(page){
      console.log(page);
      this.page = page;
      if(!page.header){window.postMessage("ToggleHeader");}
      if(page.script){
        var sc = document.createElement("script");
        sc.innerText = page.script;
        document.body.appendChild(sc);
      }
      if(page.style){
        var st = document.createElement("style");
        st.innerText = page.style;
        document.head.appendChild(st);
      }
    }else{
      this.router.navigate(["home"]);
    }
  }


  async save(){
    if(this.page){
      this.editPageModal=false;
      this.firestore.loader.show();
      await setDoc(doc(collection(this.firestore.firestore,Collections.PAGES), this.page.id),this.page);
      this.firestore.loader.hide();
      alert('Page Updated');
    }
  }

}

export interface Page{
  id:string;
  name:string;
  auth?:boolean;
  header?:boolean;
  html?:string;
  script?:string;
  style?:string;
}
