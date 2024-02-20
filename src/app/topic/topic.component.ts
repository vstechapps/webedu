import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Topic } from '../app.model';
import { collection, doc, setDoc } from 'firebase/firestore';
import { Collections, FirestoreService } from '../firestore.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TopicComponent {

  id:string | null = null;
  topic?:Topic;
  page?:string=undefined;
  newPage:string="";
  pageIndex:number=0;
  addPageModal:boolean = false;
  editPageModal:boolean = false;

  constructor(public firestore:FirestoreService,private route: ActivatedRoute){
    
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
    }
  }

  async save(){
    if(this.topic){
      await setDoc(doc(collection(this.firestore.firestore,Collections.TOPICS), this.topic.id),this.topic);
    }
  }

  next(){
    if(!this.topic) return;
    if(this.topic.pages==null) return;
    if(this.pageIndex==this.topic?.pages?.length-1)return;
    this.pageIndex++;
    this.page = this.topic.pages[this.pageIndex];
  }

  prev(){
    if(!this.topic) return;
    if(this.topic.pages==null) return;
    if(this.pageIndex==0)return;
    this.pageIndex--;
    this.page = this.topic.pages[this.pageIndex];
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
