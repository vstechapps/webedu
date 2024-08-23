import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { Role } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

  constructor(private firestore:FirestoreService, public router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.firestore.user==null || this.firestore.user.role==null || this.firestore.user.role!=Role.ADMIN){
      this.router.navigateByUrl("");
      return false;
    }
    return true;
  }
  
}
