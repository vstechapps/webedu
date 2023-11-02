import { Component } from '@angular/core';
import { Assessment } from '../app.model';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.less']
})
export class AssessmentsComponent {

  assessments:Assessment[]=[];

  constructor(){
    this.assessments.push({id:"asdf",name:"Assess 1",course:"Course 1",content:""});
  }

}
