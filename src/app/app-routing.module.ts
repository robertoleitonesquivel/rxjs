import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './Components/Client/client.component';
import { StudentComponent } from './Components/Student/student.component';
import { TeacherComponent } from './Components/Teacher/teacher.component';

const routes: Routes = [
  { path: 'client/:id/:num', component: ClientComponent },
  { path: 'teacher', component: TeacherComponent },
  { path: 'student', component: StudentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
