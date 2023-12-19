import { Component } from '@angular/core';
import { DocumentData, QueryDocumentSnapshot, collection, deleteDoc, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent {

  key?:string;
  document?:QueryDocumentSnapshot<DocumentData>;

  data?:string;

  documents:QueryDocumentSnapshot<DocumentData>[]=[];



  constructor(public firestore:FirestoreService){

  }

  edit(doc:any){
    this.document=doc;
    this.data = JSON.stringify(this.document?.data(),null,1)
  }

  fetch(){
    if(!this.key) return;
    this.documents=[];
    let collect =  collection(this.firestore.firestore, this.key);
    const q = query(collect);
    getDocs(q).then(res=>{
      res.forEach(doc=>{
        this.documents.push(doc);
      });
    });
  }

  async save(){
    if(!this.data)return;
    if(!this.key || !this.document)return;
    try{
      JSON.parse(this.data);
    }catch(err){
      console.error(err);
      alert("Error while parsing document data, please check and retry");
    }
    
    await setDoc(doc(collection(this.firestore.firestore,this.key), this.document?.id),JSON.parse(this.data));
    alert("Document Updated.");
    this.document=undefined;

  }

  async delete(){
    if(!this.data)return;
    if(!this.key || !this.document)return;
    await deleteDoc(doc(collection(this.firestore.firestore,this.key), this.document?.id));
    this.document=undefined;
  }
}
