import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Collections, FirestoreService } from '../firestore.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { collection, doc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.less'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PageComponent {
  
  @Input()
  id?:string;

  page?:Page;

  editPageModal:boolean = false;

  editPageView:string = "html";

  constructor(public router:Router,public route:ActivatedRoute, public firestore:FirestoreService){
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
          this.init();
      }
    });

  }

  ngOnInit(): void {
  }

  init(): void{
    
    let id = this.id? this.id: this.route.snapshot.paramMap.get('id');
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
    console.log(page);
    if(page && page.auth && this.firestore.user==null){
      console.log("Redirecting to Login");
      if(this.route.snapshot.url.length>0){
        let s:string[] = [];
        this.route.snapshot.url.forEach(u=>s.push(u.path));
        sessionStorage.setItem("redirect",s.join("/"));
      }
      this.router.navigate(["login"]);
    }
    else if(page){
      this.page = page;
      if(!page.header){window.postMessage("header");}
      if(page.html){
        this.updateView();
      }
      if(page.style && page.style!=""){
        this.updateStyle(page.style);
      }
      if(page.script && page.script!=""){
        this.updateScript(page.script);
      }
    }else{
      this.router.navigate(["home"]);
    }
  }

  updateView(){
    var el= document.getElementById("3593661b72952004");
    console.log(el);
    if(el && this.page && this.page.html)el.innerHTML = this.page.html;
  }

  updateStyle(style:string){
    var el= document.getElementById("3593661b72952004");
    var st = document.createElement("style");
    st.innerText = style;
    if(el)el.appendChild(st);
  }

  updateScript(script:string){
    var el= document.getElementById("3593661b72952004");
    var sc = document.createElement("script");
    sc.innerText = script;
    if(el)el.appendChild(sc);
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
