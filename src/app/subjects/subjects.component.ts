import { Component, OnInit } from '@angular/core';
import { CourseSubject } from '../models/models';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.less']
})
export class SubjectsComponent implements OnInit {

 subject:CourseSubject={name:""};
  subjects:CourseSubject[];
  constructor(public firestore:FirestoreService) {
    this.firestore.subjectRef.snapshotChanges().subscribe(res=>{
      this.subjects=res.map(a=>{let d:CourseSubject=a.payload.doc.data();d.id=a.payload.doc.id;return d;});
    })
   }

  ngOnInit(): void {
  }

  addSubject(){
    if(this.validate(this.subject.name))this.firestore.subjectRef.add(this.subject);
  }

  validate(subjectName){
    return subjectName!=null && subjectName!="";

  }

  deleteSubject(subject:CourseSubject){
    this.firestore.subjectRef.doc(subject.id).delete();
  }

}
