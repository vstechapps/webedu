import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pdfviewer',
  templateUrl: './pdfviewer.component.html',
  styleUrls: ['./pdfviewer.component.less']
})
export class PdfviewerComponent {

  url:string | null;

  constructor(private route: ActivatedRoute){
    this.url = this.route.snapshot.queryParamMap.get("url");
  }
  

}
