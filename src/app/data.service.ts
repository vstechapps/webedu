import { Inject, Injectable } from '@angular/core';
import { LoaderService } from './loader/loader.service';
import { Collections, FirestoreService } from './firestore.service';
import { Firestore, collection, doc, getDoc, getDocs, setDoc, getFirestore, query, limit, addDoc} from "firebase/firestore";

declare global {

  interface Window {
  
  dataService: DataService;
  
  }  
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  permissions:any=[];

  constructor(private firestore:FirestoreService, private loader:LoaderService, @Inject("Window") window:Window) {
    this.firestore.refreshEvent.subscribe((event)=>{
      if(event==Collections.PERMISSIONS){
        this.permissions=this.firestore.data[Collections.PERMISSIONS];
      }
    });
    window.dataService = this;
  }

  public async read(col:string,id:string,fn:Function){
    const docRef = doc(this.firestore.firestore, col, id);
    const docSnap = await getDoc(docRef);
    console.log("DataService: Collection: "+col+" Document:"+id,docSnap.data);
    fn(docSnap.data);
  }





  
}
