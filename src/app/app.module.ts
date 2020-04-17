import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { HomeComponent } from './home/home.component';
import { RouteTypes } from './route-types.enum';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent },
  { path: 'add/student', component: AddComponent, data: {type: RouteTypes.addStudent} },
  { path: 'add/course', component: AddComponent, data: {type: RouteTypes.addCourse} },
  { path: 'add/enrollment', component: AddComponent, data: {type: RouteTypes.addApplication} },
  { path: 'view/student', component: ViewComponent, data: {type: RouteTypes.viewStudent} },
  { path: 'view/course/byDept', component: ViewComponent, data: {type: RouteTypes.viewCourseByDept} },
  { path: 'view/course/byStudent', component: ViewComponent, data: {type: RouteTypes.viewCourseByStudent} }
];


@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    ViewComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatTableModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    ),
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
