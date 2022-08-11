import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './Components/Client/client.component';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './Components/Student/student.component';
import { InterceptorService } from './Core/intercept.service';
import { SpinnerComponent } from './Components/Spinner/spinner.component';
import { MaterialModule } from './shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { TeacherComponent } from './Components/Teacher/teacher.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    StudentComponent,
    SpinnerComponent,
    TeacherComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
