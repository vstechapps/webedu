import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.less']
})
export class PageComponent {

  html:string = "";

  constructor(firestore:FirestoreService){
  }

}
