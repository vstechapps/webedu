import { Component, Inject } from '@angular/core';
import { Events, FirestoreService } from './firestore.service';
import { Router, Scroll } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { delay, filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {


  header:boolean =true;
  
  constructor(private firestore:FirestoreService, public router: Router, public viewportScroller: ViewportScroller){
    this.firestore.log(Events.PAGE_VIEW);
    this.handleScroll(router,viewportScroller);
    window.addEventListener(
      "message",
      (event) => {
        console.log('Window Message:',event);
        // Do we trust the sender of this message?  
        if (event.origin !== window.location.origin) return;
        // Show popup with content
        else if(event.data=="header"){
          this.header=!this.header;
        }
        else if(event.data=="next"){
          let url = sessionStorage.getItem("next");
          if(url){
            this.router.navigateByUrl(url);
          }
        } 
        // return back control
        return;
      },
      false,
    );
  }

  handleScroll(router: Router, viewportScroller: ViewportScroller) {
    router.events
      .pipe(filter((e): e is Scroll => e instanceof Scroll))
      .pipe(delay(1))   // <--------------------------- This line
      .subscribe((e) => {
        if (e.position) {
          // backward navigation
          viewportScroller.scrollToPosition(e.position);
        } else if (e.anchor) {
          // anchor navigation
          viewportScroller.scrollToAnchor(e.anchor);
        } else {
          // forward navigation
          viewportScroller.scrollToPosition([0, 0]);
        }
      });
  }

}
