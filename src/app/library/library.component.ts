import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.less']
})
export class LibraryComponent{

  book:any=null;

  books=[{
    title:"Book 1",
    front:"<div>Book 1</div>"
  },{
    title:"Book 2",
    front:"<div>Book 2</div>"
  },{
    title:"Book 3",
    front:"<div>Book 3</div>"
  },];

  open(b:any){
    this.book=b;
  }
}
