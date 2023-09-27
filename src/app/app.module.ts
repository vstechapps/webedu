import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TechsComponent } from './techs/techs.component';
import { ExperienceComponent } from './experience/experience.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { ThreedeComponent } from './threede/threede.component';
import { SimplifyComponent } from './simplify/simplify.component';
import { ProfileComponent } from './profile/profile.component';
import { CarouselComponent } from './carousel/carousel.component';
import { Simplify2Component } from './simplify2/simplify2.component';
import { StoreComponent } from './store/store.component';
import { ConnectComponent } from './connect/connect.component';
import { BookComponent } from './book/book.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TechsComponent,
    ExperienceComponent,
    HeaderComponent,
    MenuComponent,
    ThreedeComponent,
    SimplifyComponent,
    ProfileComponent,
    CarouselComponent,
    Simplify2Component,
    StoreComponent,
    ConnectComponent,
    BookComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
