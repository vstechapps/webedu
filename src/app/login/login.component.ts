import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Role, User } from '../app.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  private provider = new GoogleAuthProvider();

  constructor(private router:Router, private fs: FirestoreService){
    fs.refreshUser.subscribe(user=>{
      if(user!=null){
        var redirect:any = sessionStorage.getItem("redirect");
        if(redirect){
          sessionStorage.removeItem("redirect");
          console.log('Redirecting to ', redirect);
          this.router.navigateByUrl(redirect);
        }else{
          this.router.navigate(["dashboard"]);
        }
      }else{
        this.router.navigate(["home"]);
      }

      
    });
  }

  login(){
    signInWithPopup(this.fs.auth, this.provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      let user:any = result.user;
      // User has properties uid, email, displayName, phoneNumber, photoURL
      let u: User = {id:user.uid,email:user.email,name:user.displayName,contact:user.phoneNumber,image:user.photoURL,role:Role.USER}
      this.fs.login(u);


    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(error);
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
  });
    
 }

}
