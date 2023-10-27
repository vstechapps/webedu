import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { CategoriesComponent } from './categories/categories.component';
import { CoursesComponent } from './courses/courses.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",redirectTo:""},
  {path:"login",component:LoginComponent},
  {path:"account",component:AccountComponent},
  {path:"profile",component:ProfileComponent},
  {path:"categories", component:CategoriesComponent},
  {path:"courses",component:CoursesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
