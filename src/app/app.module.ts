import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { MentorsignupComponent } from './mentorsignup/mentorsignup.component';
import { StudentsignupComponent } from './studentsignup/studentsignup.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CoursesComponent } from './courses/courses.component';
import { ContactusComponent } from './contactus/contactus.component';
import { SearchComponent } from './search/search.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthService } from './auth.service';
import { TestComponent } from './test/test.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    NavbarComponent,
    FooterComponent,
    BannerComponent,
    MentorsignupComponent,
    StudentsignupComponent,
    AboutusComponent,
    CoursesComponent,
    ContactusComponent,
    SearchComponent,
    PagenotfoundComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard, 
  { provide : HTTP_INTERCEPTORS, useClass : TokenInterceptorService, multi : true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
