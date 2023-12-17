import { EventEmitter, Injectable } from '@angular/core';

import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics, logEvent } from "firebase/analytics";

import { Auth, getAuth } from "firebase/auth";

import { CollectionReference, DocumentData, Firestore, collection, doc, getDoc, getDocs, setDoc, getFirestore, query} from "firebase/firestore";
import { Category, Course, Role, User } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  
  app: FirebaseApp= initializeApp(firebaseConfig);
  analytics: Analytics = getAnalytics(this.app);
  firestore: Firestore = getFirestore(this.app);
  auth: Auth = getAuth(this.app);
  
  user?:User;
  isAdmin:boolean=false;


  categoryCollection:CollectionReference<DocumentData> = collection(this.firestore, "categories");
  coursesCollection:CollectionReference<DocumentData> = collection(this.firestore,"courses");

  data:any = {};

  refreshEvent:EventEmitter<Collections> = new EventEmitter<Collections>();
  refreshUser:EventEmitter<User> = new EventEmitter<User>();

  

  constructor() {
    this.refreshUserSession();
    this.refresh(Collections.PATHS);
    this.refresh(Collections.CATEGORIES);
    this.refresh(Collections.COURSES);
    
  }

  refreshUserSession(){
    let u:any = sessionStorage.getItem("user");
    let login:string | null = sessionStorage.getItem("login");
    let check:boolean=false;
    if(login!=null && login!=""){
      let l = new Date(login).getTime();
      let c = new Date().getTime();
      check = c - l <= 15*30*30;
    }
    if(check && u){
      u = JSON.parse(u);
      this.user = u;
    }
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

  async login(user:User){
    const docRef = doc(this.firestore, "users", user.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // User already present in firestore
      let d:any = docSnap.data();
      console.log("FirestoreService:login:: Existing User :", d);
      this.user = {id:d.id,name:d.name,email:d.email,contact:d.contact,role:d.role,image:d.image};
      this.refreshUser.emit(this.user);
      sessionStorage.setItem("login",new Date().toISOString());
      this.log(Events.LOGIN,this.user);
      this.isAdmin = this.user.role==Role.ADMIN;
    } else {
      // Create new user in firestore
      console.log("FirestoreService:login:: Create new user: "+user.email);
      this.user = user;
      await setDoc(doc(collection(this.firestore,"users"), user.id),this.user);
      console.log("FirestoreService:login:: Created new user: "+user.email);
      this.refreshUser.emit(this.user);
      sessionStorage.setItem("login",new Date().toISOString());
      this.log(Events.SIGN_UP,this.user);

    }

  }

  async logout(){
    console.log("FirestoreService:logout:: Logging out user: "+this.user?.email);
    this.user=undefined;
    sessionStorage.clear();
    this.isAdmin=false;
    this.log(Events.LOGOUT,this.user);
    this.refreshUser.emit(this.user);
  }

  log(event:string,data:any=null){
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
  USERS="users",
  CATEGORIES="categories",
  COURSES="courses",
  ASSESSMENTS="assessments",
  PATHS="paths"
}

export enum Events{
  PAGE_VIEW="PAGE_VIEW",
  LOGIN="login",
  SIGN_UP="sign_up",
  LOGOUT="logout"

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
