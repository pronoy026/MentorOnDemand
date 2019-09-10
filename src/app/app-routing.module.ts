import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { BannerComponent } from './banner/banner.component';
import { SigninComponent } from './signin/signin.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: BannerComponent},
  { path : 'signin', component: SigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
