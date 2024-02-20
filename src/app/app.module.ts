import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { ProfileComponent } from './profile/profile.component';
import { CarouselComponent } from './carousel/carousel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { AccountComponent } from './account/account.component';
import { MyAssessmentsComponent } from './my-assessments/my-assessments.component';
import { AssessmentsComponent } from './assessments/assessments.component';
import { CoursesComponent } from './courses/courses.component';
import { ClientsComponent } from './clients/clients.component';
import { CategoryComponent } from './category/category.component';
import { CategoriesComponent } from './categories/categories.component';
import { CourseComponent } from './course/course.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { TopicComponent } from './topic/topic.component';
import { AdminComponent } from './admin/admin.component';
import { LogoComponent } from './logo/logo.component';
import { ViewerComponent } from './viewer/viewer.component';
import { LoaderComponent } from './loader/loader.component';
import { PageComponent } from './page/page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    ProfileComponent,
    CarouselComponent,
    DashboardComponent,
    FooterComponent,
    AccountComponent,
    MyAssessmentsComponent,
    AssessmentsComponent,
    CoursesComponent,
    ClientsComponent,
    CategoryComponent,
    CategoriesComponent,
    CourseComponent,
    AssessmentComponent,
    LoginComponent,
    LogoutComponent,
    TopicComponent,
    AdminComponent,
    LogoComponent,
    ViewerComponent,
    LoaderComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
