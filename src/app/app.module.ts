import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ProfileComponent } from './profile/profile.component';
import { InputComponent } from './input/input.component';
import { CardComponent } from './card/card.component';
import { SubjectsComponent } from './subjects/subjects.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    QuizComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    InputComponent,
    CardComponent,
    SubjectsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    MatSidenavModule,MatIconModule,MatToolbarModule,MatButtonModule,MatListModule,MatRippleModule,MatExpansionModule,MatFormFieldModule,MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
