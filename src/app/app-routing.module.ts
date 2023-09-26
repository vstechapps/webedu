import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperienceComponent } from './experience/experience.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ImpulseComponent } from './impulse/impulse.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"iam",loadChildren: () => import('./modules/iam/iam.module').then(m => m.IamModule),canActivate:[AuthGuard]},
  {path:"ecm",loadChildren: () => import('./modules/ecm/ecm.module').then(m => m.EcmModule)},
  {path:"bpm",loadChildren: () => import('./modules/bpm/bpm.module').then(m => m.BpmModule)},
  {path:"mdm",loadChildren: () => import('./modules/mdm/mdm.module').then(m => m.MdmModule)},
  {path:"impulse",component:ImpulseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
