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
  showPopup: boolean = false;
  
  constructor(private firestore:FirestoreService,router: Router, viewportScroller: ViewportScroller){
    this.firestore.log(Events.PAGE_VIEW);
    this.handleScroll(router,viewportScroller);
    window.addEventListener(
      "message",
      (event) => {
        // Do we trust the sender of this message?  
        if (event.origin !== window.location.origin) return;
        // Show popup with content
        if(event.data=="DemoMessage") this.showPopup=true;
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
