import { Component } from '@angular/core';
import { Category, Topic } from '../app.model';
import { DocumentReference, addDoc, collection } from 'firebase/firestore';
import { Collections, FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.less']
})
export class TopicsComponent {

  addTopicModal:boolean=false;
  topic:Topic = {name:"",description:"",lock:false,active:true};

  topics:Topic[]=[];

  deleteConfirm:boolean=false;

constructor(public firestore:FirestoreService){
  this.setTopics(this.firestore.data[Collections.TOPICS]);
  this.firestore.refreshEvent.subscribe(collection=>{
    if(collection=Collections.TOPICS){
      this.setTopics(this.firestore.data[Collections.TOPICS]);
      
    }
  })
}

setTopics(topics:Topic[]){
  if(topics==undefined) return;
  this.topics = topics.filter((c: any) => c.active == true);
  if (this.firestore.isAdmin) {
    this.topics = topics;
  }
}

addTopic(){
  console.log(this.topic);
  if(this.validate()){
    addDoc(collection(this.firestore.firestore,Collections.TOPICS),this.topic).then((ref:DocumentReference)=>{
      alert("Topic has been added succesfully ID:"+ref.id);
      this.firestore.refresh(Collections.TOPICS);
    });
  }
  else{
    alert("Please enter name, description");
  }
  
}

validate(){
  return this.isNotEmpty(this.topic.name) && this.isNotEmpty(this.topic.description);
}

isNotEmpty(str:string){
  return str!=null && str!="";
}


}

