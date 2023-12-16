import { Component, OnDestroy, OnInit } from '@angular/core';
import { Course } from '../app.model';
import { collection, doc, setDoc } from 'firebase/firestore';
import { Collections, FirestoreService } from '../firestore.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.less']
})
export class CourseComponent implements OnInit, OnDestroy{

  id:string | null = null;
  course?:Course;
  page?:string=undefined;
  newPage:string="";
  pageIndex:number=0;
  addPageModal:boolean = false;
  editPageModal:boolean = false;

  constructor(public firestore:FirestoreService,private route: ActivatedRoute){
    
  }

  ngOnDestroy(): void {
    window.postMessage("ToggleHeader");
  }

  ngOnInit(): void {
    window.postMessage("ToggleHeader");
    this.id = this.route.snapshot.paramMap.get('id');
    console.log("Course ID: "+this.id);
    if(this.firestore.data[Collections.COURSES]==null){
      this.firestore.refreshEvent.subscribe(collection=>{
        if(collection==Collections.COURSES){
          this.refresh();
        }
      });
    }else{
      this.refresh();
    }
  }

  refresh(){
    var course = undefined;
    if(this.id && this.firestore.data[Collections.COURSES]!=undefined){
      course = this.firestore.data[Collections.COURSES].filter((c:any)=>c.id==this.id)[0];
    }
    if(course){
      this.course = course;
    }
    if(this.course?.pages && this.course?.pages[0]){
      this.page = this.course.pages[0];
    }
  }

  async save(){
    if(this.course){
      await setDoc(doc(collection(this.firestore.firestore,Collections.COURSES), this.course.id),this.course);
    }
  }

  next(){
    if(!this.course) return;
    if(this.course.pages==null) return;
    if(this.pageIndex==this.course?.pages?.length-1)return;
    this.pageIndex++;
    this.page = this.course.pages[this.pageIndex];
  }

  prev(){
    if(!this.course) return;
    if(this.course.pages==null) return;
    if(this.pageIndex==0)return;
    this.pageIndex--;
    this.page = this.course.pages[this.pageIndex];
  }

  async addPage(){
    if(!this.course) return;
    if(this.course.pages==null) this.course.pages=[];
    this.course.pages.push(this.newPage);
    await this.save();
    alert("Page Added");
    this.pageIndex=this.course.pages.length-1;
    this.page = this.course.pages[this.pageIndex];
    this.addPageModal=false;
  }

  async deletePage(){
    if(!this.course) return;
    if(this.course.pages==null) return;
    if(!this.page) return;
    this.course.pages.splice(this.pageIndex,1);
    await this.save();
    alert("Page Deleted");
    this.pageIndex=0;
    this.page = this.course.pages[this.pageIndex];
    this.editPageModal=false;
  }

  async editPage(){
    if(!this.course) return;
    if(this.course.pages==null) return;
    if(!this.page) return;
    this.course.pages[this.pageIndex] = this.page;
    await this.save();
    alert("Page Updated");
    this.page = this.course.pages[this.pageIndex];
    this.editPageModal=false;
  }

}
