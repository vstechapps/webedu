import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less']
})
export class InputComponent implements OnInit {

  @Input()
  type:string="text";

  @Input()
  label:string="Enter";

  @Input()
  value:string="";

  @Output() valueChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
