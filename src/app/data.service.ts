import { Inject, Injectable } from '@angular/core';
import { LoaderService } from './loader/loader.service';
import { Collections, FirestoreService } from './firestore.service';
import { doc, getDoc} from "firebase/firestore";

declare var dataService:DataSer;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  permissions:any=[];

  constructor(private firestore:FirestoreService, private loader:LoaderService) {
    console.log("Loading DataService");
    this.firestore.refreshEvent.subscribe((event)=>{
      if(event==Collections.PERMISSIONS){
        this.permissions=this.firestore.data[Collections.PERMISSIONS];
      }
    });
    
    dataService = {read:this.read};
  }

  public async read(col:string,id:string,fn:Function){
    const docRef = doc(this.firestore.firestore, col, id);
    const docSnap = await getDoc(docRef);
    
    if(docSnap.exists()){
      var data = docSnap.data();
      console.log("DataService: Collection: "+col+" Document:"+id,data);
      fn(data);
    }else{
      console.log("DataService: Collection:"+col+" Document:"+id,"No Data");
    }
  }





  
}

interface DataSer{
  read:any;
}
