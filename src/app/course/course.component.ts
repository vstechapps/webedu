import { Component, OnInit } from '@angular/core';
import { ContentType, Course, Topic } from '../app.model';
import { Collections, FirestoreService } from '../firestore.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.less']
})
export class CourseComponent implements OnInit{

  course?:Course;
  courses:Course[] = [];
  id:string | null = null;
  topics:Topic[]=[];

  constructor(public firestore:FirestoreService,private route: ActivatedRoute, private router:Router){

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    if(this.firestore.data[Collections.COURSES]!=null){
      this.courses = this.firestore.data[Collections.COURSES];
      this.course = this.courses.filter(p=>p.id==this.id)[0];
    }
    if(this.firestore.data[Collections.TOPICS]!=null){
      this.setTopics();
    }
    this.firestore.refreshEvent.subscribe(collection=>{
      if(collection==Collections.COURSES){
        this.courses = this.firestore.data[Collections.COURSES];
        this.course = this.courses.filter(p=>p.id==this.id)[0];
      }
      if(collection ==Collections.TOPICS){
        this.setTopics();
      }
    });
  }

  setTopics(){
    let topics:Topic[] = [];
    topics = this.firestore.data[Collections.TOPICS];
    let filtered = topics.filter(t=>t.id!=null && this.course?.topics?.includes(t.id));
    this.course?.topics?.forEach(t=>{
      filtered.forEach(f=>{
        if(t==f.id){
          this.topics.push(f);
        }
      })
    })
  }

  launch(t:Topic){
    if(t.lock){
      window.location.href="https://learn.vvsk.in";
    }else if(t.type==ContentType.PDF){
      window.location.href=window.location.origin+"/pdfviewer?url="+t.url+"&back="+window.location.href;
    }else if(t.type==ContentType.URL){
      window.open(t.url);
    }
    
  }
}
