import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Topic } from '../app.model';
import { collection, doc, setDoc } from 'firebase/firestore';
import { Collections, FirestoreService } from '../firestore.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.less'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TopicComponent {

  id:string | null = null;
  topic?:Topic;
  page?:string=undefined;
  newPage:string="";
  pageIndex:number=0;
  addPageModal:boolean = false;
  editPageModal:boolean = false;

  back:string | null;
  referenceWidth = window.innerWidth/3;

  constructor(public firestore:FirestoreService,private route: ActivatedRoute){
    this.back = this.route.snapshot.queryParamMap.get("back"); 
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log("Topic ID: "+this.id);
    if(this.firestore.data[Collections.TOPICS]==null){
      this.firestore.refreshEvent.subscribe(collection=>{
        if(collection==Collections.TOPICS){
          this.refresh();
        }
      });
    }else{
      this.refresh();
    }
  }

  refresh(){
    var topic = undefined;
    if(this.id && this.firestore.data[Collections.TOPICS]!=undefined){
      topic = this.firestore.data[Collections.TOPICS].filter((c:any)=>c.id==this.id)[0];
    }
    if(topic){
      this.topic = topic;
    }
    if(this.topic?.pages && this.topic?.pages[0]){
      this.page = this.topic.pages[0];
      this.updateView();
    }
  }

  async save(){
    if(this.topic){
      await setDoc(doc(collection(this.firestore.firestore,Collections.TOPICS), this.topic.id),this.topic);
    }
  }

  updateView(){
    if(this.topic?.id){
      var el= document.getElementById("3593661b72952003");
      console.log(el);
      if(el && this.page)el.innerHTML = this.page;
    }
  }

  react(event:MouseEvent){
    console.log("Click Event: ",event);
    let target:any = event.target;
    if(target && target.id=="close"){
      this.goback();
      event.stopImmediatePropagation();
    }
    if(event.clientX<this.referenceWidth){
      this.prev();
    }else if(event.clientX>2*this.referenceWidth){
      this.next();
    }

  }

  goback(){
    if(this.back){
      console.log("redirecting to "+this.back);
      window.location.href=this.back;
    }
  }


  next(){
    if(!this.topic) return;
    if(this.topic.pages==null) return;
    if(this.pageIndex==this.topic?.pages?.length-1)return;
    this.pageIndex++;
    this.page = this.topic.pages[this.pageIndex];
    this.updateView();
  }

  prev(){
    if(!this.topic) return;
    if(this.topic.pages==null) return;
    if(this.pageIndex==0)return;
    this.pageIndex--;
    this.page = this.topic.pages[this.pageIndex];
    this.updateView();
  }

  async addPage(){
    if(!this.topic) return;
    if(this.topic.pages==null) this.topic.pages=[];
    this.topic.pages.push(this.newPage);
    await this.save();
    alert("Page Added");
    this.pageIndex=this.topic.pages.length-1;
    this.page = this.topic.pages[this.pageIndex];
    this.addPageModal=false;
    this.newPage="";
  }

  async deletePage(){
    if(!this.topic) return;
    if(this.topic.pages==null) return;
    if(!this.page) return;
    this.topic.pages.splice(this.pageIndex,1);
    await this.save();
    alert("Page Deleted");
    this.pageIndex=0;
    this.page = this.topic.pages[this.pageIndex];
    this.editPageModal=false;
  }

  async editPage(){
    if(!this.topic) return;
    if(this.topic.pages==null) return;
    if(!this.page) return;
    this.topic.pages[this.pageIndex] = this.page;
    await this.save();
    alert("Page Updated");
    this.page = this.topic.pages[this.pageIndex];
    this.editPageModal=false;
  }

}
