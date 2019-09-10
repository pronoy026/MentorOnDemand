import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { SigninComponent } from './signin/signin.component';
import { StudentsignupComponent } from './studentsignup/studentsignup.component';
import { MentorsignupComponent } from './mentorsignup/mentorsignup.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: BannerComponent},
  { path : 'signin', component: SigninComponent},
  { path: 'studentsignup', component : StudentsignupComponent},
  { path: 'mentorsignup', component : MentorsignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
