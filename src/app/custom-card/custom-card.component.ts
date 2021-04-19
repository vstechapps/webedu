import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.less']
})
export class CustomCardComponent implements OnInit {

  @Input()
  dynamic:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

}
