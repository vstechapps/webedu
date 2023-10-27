import { Component } from '@angular/core';
import { Course } from '../app.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.less']
})
export class CourseComponent {

  course?:Course;

}
