import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less']
})
export class CarouselComponent {

  texts=[
    "Write - Event Driven Functions",
    "Build - Reusable Components",
    "Choose - Scalable Architecture",
    "Design - Reliable Systems",
    "Deploy - Cloud Ready Apps"
  ];

}
