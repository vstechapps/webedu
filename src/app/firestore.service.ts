import { Injectable } from '@angular/core';

import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(this.app);

  constructor() { }

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

export enum Events{
  PAGE_VIEW="PAGE_VIEW",
  LOGIN="login",
  SIGN_UP="sign_up"

}

const firebaseConfig = {
  apiKey: "AIzaSyAa3aCpidnJ3MB3D2FlpkCHGuVcRyhfmb8",
  authDomain: "vvskchaitanya-1.firebaseapp.com",
  projectId: "vvskchaitanya-1",
  storageBucket: "vvskchaitanya-1.appspot.com",
  messagingSenderId: "683857452414",
  appId: "1:683857452414:web:41b3da4368a3df73d5272f",
  measurementId: "G-BCJ69CN9L7"
};
