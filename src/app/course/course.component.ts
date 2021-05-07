import { Component, OnInit } from '@angular/core';
import { Course, UserCourse, CourseStatus, ContentType, Question } from '../models/models';
import { FirestoreService } from '../services/firestore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  start:boolean=false;
  constructor(public firestore:FirestoreService,private route: ActivatedRoute,private router:Router,private toaster:ToastrService) {
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
    this.firestore.userCourseRef.add({user:this.firestore.user.id,course:this.courseId,status:CourseStatus.InProgress,started:(new Date()).toLocaleDateString()})
    .then(()=>this.refresh());
  }

  unregister(){
    this.firestore.userCourseRef.doc(this.userCourse.id).delete()
    .then(()=>this.refresh());
  }

  refresh(){
    this.userCourse=this.firestore.user.courses.filter(usercourse=>usercourse.course==this.courseId)[0];
    this.newQuestion={text:"",options:[]};
  }

  startQuiz(){
    this.shuffleQuestions();
    this.start=true;
  }

  shuffleQuestions(){
    var currentIndex = this.course.questions.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = this.course.questions[currentIndex];
      this.course.questions[currentIndex] = this.course.questions[randomIndex];
      this.course.questions[randomIndex] = temporaryValue;
    }
    // For Shuffling options of each question
    this.course.questions.forEach(q=>{
      var currentIndex = q.options.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      if(currentIndex+1==q.correct){q.correct=randomIndex+1;}
      else if(randomIndex+1==q.correct){q.correct=currentIndex+1;}
      temporaryValue = q.options[currentIndex];
      q.options[currentIndex] = q.options[randomIndex];
      q.options[randomIndex] = temporaryValue;
    }
    });
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
    if(score<100)this.toaster.error("You scored "+score+" out of 100, Retry","Result : FAILED");
    else this.toaster.success("You scored "+score+" out of 100, Congrats","Result : PASS");
    this.start=false;
    if(this.userCourse){
      this.userCourse.score=score;
      if(this.userCourse.score==100){
        this.userCourse.status=CourseStatus.Completed;
      }else{
        this.userCourse.status=CourseStatus.InProgress;
      }
    }
    this.firestore.userCourseRef.doc(this.userCourse.id).set(this.userCourse).then(()=>this.refresh());
  }

  updateOption(optionIndex,event){
    this.course.questions[this.questionIndex].options[optionIndex]=event;
  }


}
