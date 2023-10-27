import { EventEmitter, Injectable } from '@angular/core';

import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics, logEvent } from "firebase/analytics";

import { Auth, getAuth } from "firebase/auth";

import { CollectionReference, DocumentData, Firestore, collection, getDocs, getFirestore, query} from "firebase/firestore";
import { Category, Course, User } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  
  app: FirebaseApp= initializeApp(firebaseConfig);
  analytics: Analytics = getAnalytics(this.app);
  firestore: Firestore = getFirestore(this.app);
  auth: Auth = getAuth(this.app);
  
  user?:User;


  categoryCollection:CollectionReference<DocumentData> = collection(this.firestore, "categories");
  coursesCollection:CollectionReference<DocumentData> = collection(this.firestore,"courses");

  data:any = {};

  refreshEvent:EventEmitter<Collections> = new EventEmitter<Collections>();
  refreshUser:EventEmitter<User> = new EventEmitter<User>();

  

  constructor() {
    this.refresh(Collections.CATEGORIES);
    this.refresh(Collections.COURSES);    
  }

  refresh(key:Collections){
    let collect =  collection(this.firestore, key);
    const q = query(collect);
    getDocs(q).then(res=>{
    this.data[key] =[];
    res.forEach(doc=>
      {
        let d:any = doc.data();
        d.id=doc.id;
        this.data[key].push(d);
      });
      this.refreshEvent.emit(key);
    });
  }

  logIn(){
    
  }

  log(event:string,data=null){
    let message:any={
      url:window.location.href,
      device:window.navigator.userAgent,
      timestamp:new Date().toISOString(),
      event:event
    }
    if(data){
      message.data=data;
    }
    console.log("Sending Event to Analytics: ",message);
    logEvent(this.analytics, event, message);
  }

  
}

export enum Collections{
  CATEGORIES="categories",
  COURSES="courses",
  ASSESSMENTS="assessments"
}

export enum Events{
  PAGE_VIEW="PAGE_VIEW",
  LOGIN="login",
  SIGN_UP="sign_up"

}

const firebaseConfig = {
  apiKey: "AIzaSyCKKFA4iBcqm_RaojG8mBCIwRwiP_caKCE",
  authDomain: "impulse-develop.firebaseapp.com",
  projectId: "impulse-develop",
  storageBucket: "impulse-develop.appspot.com",
  messagingSenderId: "946243191276",
  appId: "1:946243191276:web:eed8ce767fa1d458aa40c9",
  measurementId: "G-BDL31YG14K"
};
