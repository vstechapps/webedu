import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DomainsComponent } from './domains/domains.component';
import { DomainComponent } from './domain/domain.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"",component:HomeComponent}
];

@NgModule({
  declarations: [
    HomeComponent,
    DomainsComponent,
    DomainComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class IamModule { }


