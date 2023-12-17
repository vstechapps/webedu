import { Component, OnInit } from '@angular/core';
import { Collections, FirestoreService } from '../firestore.service';
import { Path } from '../app.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.less']
})
export class PathComponent implements OnInit{

  path?:Path;
  paths:Path[] = [];
  id:string | null = null;

  constructor(public firestore:FirestoreService,private route: ActivatedRoute){
    

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    if(this.firestore.data[Collections.PATHS]!=null){
      this.paths = this.firestore.data[Collections.PATHS];
      this.path = this.paths.filter(p=>p.id==this.id)[0];
    }
    this.firestore.refreshEvent.subscribe(collection=>{
      if(collection==Collections.PATHS){
        this.paths = this.firestore.data[Collections.PATHS];
        this.path = this.paths.filter(p=>p.id==this.id)[0];
      }
    });
  }

}
