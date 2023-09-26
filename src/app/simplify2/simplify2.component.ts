import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-simplify2',
  templateUrl: './simplify2.component.html',
  styleUrls: ['./simplify2.component.less']
})
export class Simplify2Component {

  @Input()
  text:string = "";

}
