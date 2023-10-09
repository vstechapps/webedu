import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../app.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less']
})
export class CategoryComponent {

  @Input()
  category?:Category;

  @Input()
  current?:Category;

  @Output()
  select:EventEmitter<Category> = new EventEmitter();

  expand:boolean=false;

  

  

  

}
