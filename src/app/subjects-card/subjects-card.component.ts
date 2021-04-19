import { Component, OnInit } from '@angular/core';
import { CourseSubject } from '../models/models';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-subjects-card',
  templateUrl: './subjects-card.component.html',
  styleUrls: ['./subjects-card.component.less']
})
export class SubjectsCardComponent implements OnInit {
  subject:CourseSubject={name:""};
  subjects:CourseSubject[];
  constructor(public firestore:FirestoreService) {
    this.firestore.subjectRef.snapshotChanges().subscribe(res=>{
      console.log(res);
      this.subjects=res.map(a=>{let d:CourseSubject=a.payload.doc.data();d.id=a.payload.doc.id;return d;});
      console.log(this.subjects);
    })
   }

  ngOnInit(): void {
  }

  addSubject(){
    this.firestore.subjectRef.add(this.subject);
  }

  deleteSubject(subject:CourseSubject){
    this.firestore.subjectRef.doc(subject.id).delete();
  }

}
