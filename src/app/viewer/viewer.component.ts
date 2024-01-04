import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.less']
})
export class ViewerComponent {

  url:string | null;

  constructor(private route: ActivatedRoute){
    this.url = this.route.snapshot.queryParamMap.get("url");
  }

}
