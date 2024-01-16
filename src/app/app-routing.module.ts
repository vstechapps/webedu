import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { CategoriesComponent } from './categories/categories.component';
import { CoursesComponent } from './courses/courses.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { AssessmentsComponent } from './assessments/assessments.component';
import { CourseComponent } from './course/course.component';
import { LoginGuard } from './login.guard';
import { TopicsComponent } from './topics/topics.component';
import { TopicComponent } from './topic/topic.component';
import { AdminComponent } from './admin/admin.component';
import { ViewerComponent } from './viewer/viewer.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"home/:focus",component:HomeComponent},
  {path:"admin",component:AdminComponent},
  {path:"login",component:LoginComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"logout",component:LogoutComponent},
  {path:"account",component:AccountComponent},
  {path:"profile",component:ProfileComponent},
  {path:"categories", component:CategoriesComponent},
  {path:"topics",component:TopicsComponent},
  {path:"topics/:id",component:TopicComponent},
  {path:"courses",component:CoursesComponent},
  {path:"courses/:id",component:CourseComponent,canActivate:[LoginGuard]},
  {path:"assessments",component:AssessmentsComponent},
  {path:"assessments/:id",component:AssessmentComponent},
  {path:"pdfviewer",component:ViewerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
