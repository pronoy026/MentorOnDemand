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
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { MentorhomeComponent } from './mentorhome/mentorhome.component';
import { StudentappliedcoursesComponent } from './studentappliedcourses/studentappliedcourses.component';
import { StudentregisteredcoursesComponent } from './studentregisteredcourses/studentregisteredcourses.component';
import { AllstudentsComponent } from './allstudents/allstudents.component';
import { AllcoursesComponent } from './allcourses/allcourses.component';
import { AllmentorsComponent } from './allmentors/allmentors.component';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { BlockedstudentsComponent } from './blockedstudents/blockedstudents.component';
import { BlockedmentorsComponent } from './blockedmentors/blockedmentors.component';
import { StudentpaymentComponent } from './studentpayment/studentpayment.component';
import { StudenteditprofileComponent } from './studenteditprofile/studenteditprofile.component';
import { MentorregisteredcoursesComponent } from './mentorregisteredcourses/mentorregisteredcourses.component';
import { MentorrequestedcoursesComponent } from './mentorrequestedcourses/mentorrequestedcourses.component';
import { MentoreditprofileComponent } from './mentoreditprofile/mentoreditprofile.component';
import { MentorcompletedcoursesComponent } from './mentorcompletedcourses/mentorcompletedcourses.component';
import { StudentcompletedcoursesComponent } from './studentcompletedcourses/studentcompletedcourses.component';
import { CourseOverviewComponent } from './course-overview/course-overview.component';


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
  { path: 'studentpayment', component: StudentpaymentComponent },
  {
    path: 'adminhome',
    component: AdminhomeComponent,
    children: [
      { path: 'allstudents', component: AllstudentsComponent },
      { path: 'allcourses', component: AllcoursesComponent },
      { path: 'allmentors', component: AllmentorsComponent },
      { path: 'addcourse', component: AddcourseComponent },
      { path: 'blockedstudents', component: BlockedstudentsComponent },
      { path: 'blockedmentors', component: BlockedmentorsComponent }
    ],
    canActivate: [AuthGuard]
  },

  {
    path: 'mentorhome', component: MentorhomeComponent,
    children: [
      {
        path: 'mentorregisteredcourses', component: MentorregisteredcoursesComponent
      },
      {
        path: 'mentorrequestedcourses', component: MentorrequestedcoursesComponent
      },
      {
        path: 'mentoreditprofile', component: MentoreditprofileComponent
      },
      {
        path : 'mentorcompletedcourses', component : MentorcompletedcoursesComponent
      }
    ],
    canActivate: [AuthGuard]
  },

  {
    path: 'studenthome',
    component: TestComponent,
    children: [
      {
        path: 'studentappliedcourses', component: StudentappliedcoursesComponent
      },
      {
        path: 'studentregisteredcourses', component: StudentregisteredcoursesComponent
      },
      {
        path: 'studenteditprofile', component: StudenteditprofileComponent
      },
      {
        path : 'studentcompletedcourses', component: StudentcompletedcoursesComponent
      },
      {
        path : 'courseoverview', component: CourseOverviewComponent
      }

    ],
    canActivate: [AuthGuard]
  }, // Can route only after logging in
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
