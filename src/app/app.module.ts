import { forwardRef, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material/material.module';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ApiInterceptor } from './services/api-interceptor';
import { HomeComponent } from './components/home/home.component';
import { ToolbarComponent } from './components/common/toolbar/toolbar.component';
import { CourseDetailsComponent } from './components/course/course-details/course-details.component';
import { NewCourseComponent } from './components/home/new-course/new-course.component';
import { EditCourseComponent } from './components/course/edit-course/edit-course.component';
import { EditWordsComponent } from './components/course/edit-words/edit-words.component';
import { ChipInputComponent } from './components/common/chip-input/chip-input.component';

const API_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: forwardRef(() => ApiInterceptor),
  multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ToolbarComponent,
    CourseDetailsComponent,
    NewCourseComponent,
    EditCourseComponent,
    EditWordsComponent,
    ChipInputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    ApiInterceptor,
    API_INTERCEPTOR_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
