import { Component, OnInit } from '@angular/core';
import { Course, UserCourse, CourseStatus, Topic, ContentType, Role } from '../models/models';
import { FirestoreService } from '../services/firestore.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.less']
})
export class CourseComponent implements OnInit {

  courseId:string;
  course:Course;
  userCourse:UserCourse;
  topicIndex=0;
  newTopic:Topic;
  contentTypes:any[];
  ContentType=ContentType;

  constructor(public firestore:FirestoreService,private route: ActivatedRoute,private router:Router) {
    this.contentTypes=Object.values(ContentType);
   }

  ngOnInit(): void {
    this.courseId=this.route.snapshot.paramMap.get('id')
    if(this.courseId==null)this.router.navigate(["dashboard"]);
    this.firestore.courseRef.doc(this.courseId).valueChanges().subscribe((course:Course)=>{
      console.log("Course Refreshed : ",course)
      this.course=course;
      this.course.topics=this.course.topics.sort((a,b)=>a.order-b.order);
      this.refresh();
    });
  }

  register(){
    this.firestore.userCourseRef.add({user:this.firestore.user.id,course:this.courseId,status:CourseStatus.InProgress,started:(new Date()).toLocaleDateString(),topic:0})
    .then(()=>this.refresh());
  }

  unregister(){
    this.firestore.userCourseRef.doc(this.userCourse.id).delete()
    .then(()=>this.refresh());
  }

  refresh(){
    this.userCourse=this.firestore.user.courses.filter(usercourse=>usercourse.course==this.courseId)[0];
    if(this.userCourse)this.topicIndex=this.userCourse.topic;
    this.newTopic={name:"",type:ContentType.HTML,content:"",url:"",order:0};
    this.newTopic.order=this.course.topics.length;
  }

  addTopic(){
    this.course.topics.push(this.newTopic);
    this.firestore.courseRef.doc(this.courseId).set(this.course).then(()=>this.refresh());
  }

  updateTopic(){
    this.firestore.courseRef.doc(this.courseId).set(this.course).then(()=>this.refresh());
  }

  deleteTopic(){
    this.course.topics.slice(this.topicIndex,1);
    this.firestore.courseRef.doc(this.courseId).set(this.course).then(()=>this.refresh());
  }

  next(){
    if(this.topicIndex==this.course.topics.length-1)return;
    else this.topicIndex++;
  }

  prev(){
    if(this.topicIndex==0)return;
    else this.topicIndex--;
  }


}
