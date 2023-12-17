import { Component } from '@angular/core';
import { Collections, FirestoreService } from '../firestore.service';
import { Path } from '../app.model';

@Component({
  selector: 'app-paths',
  templateUrl: './paths.component.html',
  styleUrls: ['./paths.component.less']
})
export class PathsComponent {

paths:Path[] = [];

constructor(public firestore:FirestoreService){
  if(this.firestore.data[Collections.PATHS]!=null){
    this.paths = this.firestore.data[Collections.PATHS];
  }
  this.firestore.refreshEvent.subscribe(collection=>{
    if(collection==Collections.PATHS){
      this.paths = this.firestore.data[Collections.PATHS];
    }
  });
}

}

