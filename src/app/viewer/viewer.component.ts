import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { Utility } from '../app-utilt';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.less']
})
export class ViewerComponent {

  url:string | null;
  back:string | null;

  numPages: number = 0;
  isMobile:boolean = Utility.mobileAndTabletCheck();

  page:number = 1;

  constructor(private route: ActivatedRoute){
    console.log("isMobile: "+this.isMobile);
    this.url = this.route.snapshot.queryParamMap.get("url");
    this.back = this.route.snapshot.queryParamMap.get("back");
  }

  callBackFn(pdf: PDFDocumentProxy) {
    // do anything with "pdf"
    this.numPages=pdf.numPages;
  }

  next(){
    if(this.page>=this.numPages)return;
    this.page++;
  }

  prev(){
    if(this.page<=1)return;
    this.page--;
  }

}
