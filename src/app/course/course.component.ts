import { Component, OnInit } from '@angular/core';
import { Course, UserCourse, CourseStatus, ContentType, Question } from '../models/models';
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
  questionIndex=0;
  newQuestion:Question;
  rows:number=1;

  constructor(public firestore:FirestoreService,private route: ActivatedRoute,private router:Router) {
   }

  ngOnInit(): void {
    this.courseId=this.route.snapshot.paramMap.get('id')
    if(this.courseId==null)this.router.navigate(["dashboard"]);
    this.firestore.courseRef.doc(this.courseId).valueChanges().subscribe((course:Course)=>{
      console.log("Course Refreshed : ",course)
      this.course=course;
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
    if(this.userCourse)this.questionIndex=this.userCourse.topic;
    this.newQuestion={text:"",options:[]};
  }

  addQuestion(){
    this.course.questions.push(this.newQuestion);
    this.questionIndex=this.course.questions.length-1;
  }

  updateQuestion(){
    this.firestore.courseRef.doc(this.courseId).set(this.course).then(()=>this.refresh());
  }

  deleteQuestion(){
    this.course.questions.splice(this.questionIndex,1);
    this.firestore.courseRef.doc(this.courseId).set(this.course).then(()=>this.refresh());
  }

  next(){
    if(this.questionIndex==this.course.questions.length-1)return;
    else this.questionIndex++;
  }

  prev(){
    if(this.questionIndex==0)return;
    else this.questionIndex--;
  }

  evaluate(){
    let correct=this.course.questions.filter(q=>q.select==q.correct).length;
    let total=this.course.questions.length;
    let score=Math.round(correct/total*100);
    alert("Score : "+score);
    if(this.userCourse){
      this.userCourse.score=score;
      if(this.userCourse.score==100){
        this.userCourse.status=CourseStatus.Completed;
      }
    }
    this.firestore.userCourseRef.doc(this.userCourse.id).set(this.userCourse).then(()=>this.refresh());
  }

  updateOption(optionIndex,event){
    this.course.questions[this.questionIndex].options[optionIndex]=event;
  }


}
