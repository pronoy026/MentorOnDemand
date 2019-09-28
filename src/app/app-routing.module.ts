import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { SigninComponent } from './signin/signin.component';
import { StudentsignupComponent } from './studentsignup/studentsignup.component';
import { MentorsignupComponent } from './mentorsignup/mentorsignup.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CoursesComponent } from './courses/courses.component';
import { ContactusComponent } from './contactus/contactus.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SearchComponent } from './search/search.component';
import { TestComponent } from './test/test.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: BannerComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'studentsignup', component: StudentsignupComponent },
  { path: 'mentorsignup', component: MentorsignupComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'search', component: SearchComponent },
  { path: 'test', component: TestComponent, canActivate: [AuthGuard] }, // Can route only after logging in
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
