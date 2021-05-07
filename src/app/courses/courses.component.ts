import { Component, OnInit } from '@angular/core';
import { Course } from '../models/models';
import { FirestoreService } from '../services/firestore.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.less']
})
export class CoursesComponent implements OnInit {


  course:Course={name:"",subject:"",duration:"",questions:[]};
  constructor(public firestore:FirestoreService,private storage:AngularFireStorage,private toaster:ToastrService) {

   }

  ngOnInit(): void {
  }

  addCourse(){
    if(this.validate())this.firestore.courseRef.add(this.course).then(()=>
    this.toaster.success(this.course.name+" has been added","SUCCESS")
    );;
  }

  deleteCourse(course:Course){
    this.firestore.courseRef.doc(course.id).delete().then(()=>
    this.toaster.success(course.name+" has been deleted","SUCCESS")
    );
  }

  validate(){
    console.log(this.course);
    return this.course.name!="" && this.course.subject!="" && this.firestore.subjects.indexOf(this.course.subject)>-1;
  }

  backupCourses(){
    var json = JSON.stringify(this.firestore.courses);
    var blob = new Blob([json], {type: "application/json"});
    this.storage.ref("courses.json").put(blob);
    this.toaster.success("All courses are uploaded for backup","SUCCESS");
  }
}
