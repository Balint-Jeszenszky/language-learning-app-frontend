import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessGuard } from './access-guard';
import { AuthComponent } from './components/auth/auth.component';
import { CourseDetailsComponent } from './components/course/course-details/course-details.component';
import { EditCourseComponent } from './components/course/edit-course/edit-course.component';
import { EditWordsComponent } from './components/course/edit-words/edit-words.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { requiresLogin: true, redirectTo: '/auth' }, canActivate: [ AccessGuard ] },
  { path: 'auth', component: AuthComponent, data: { requiresLogout: true, redirectTo: '/' }, canActivate: [ AccessGuard ], runGuardsAndResolvers: 'always' },
  { path: 'course/:id', component: CourseDetailsComponent, data: { requiresLogin: true, redirectTo: '/auth' }, canActivate: [ AccessGuard ] },
  { path: 'course/:id/edit', component: EditCourseComponent, data: { requiresLogin: true, redirectTo: '/auth' }, canActivate: [ AccessGuard ] },
  { path: 'course/:id/words/edit', component: EditWordsComponent, data: { requiresLogin: true, redirectTo: '/auth' }, canActivate: [ AccessGuard ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
  providers: [AccessGuard]
})
export class AppRoutingModule { }
