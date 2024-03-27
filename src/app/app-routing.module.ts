import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { AssessmentsComponent } from './assessments/assessments.component';
import { CourseComponent } from './course/course.component';
import { LoginGuard } from './login.guard';
import { TopicComponent } from './topic/topic.component';
import { AdminComponent } from './admin/admin.component';
import { ViewerComponent } from './viewer/viewer.component';
import { PageComponent } from './page/page.component';
import { PagesComponent } from './pages/pages.component';
import { BookComponent } from './book/book.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"home/:focus",component:HomeComponent},
  {path:"admin",component:AdminComponent},
  {path:"login",component:LoginComponent},
  {path:"logout",component:LogoutComponent},
  {path:"pages",component:PagesComponent},
  {path:"pages/:id",component:PageComponent},
  {path:"p/:id",component:PageComponent},
  {path:"topics/:id",component:TopicComponent},
  {path:"book",component:BookComponent},
  {path:"courses",component:CoursesComponent},
  {path:"courses/:id",component:CourseComponent,canActivate:[LoginGuard]},
  {path:"pdfviewer",component:ViewerComponent},
  {path:":id",component:PageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
