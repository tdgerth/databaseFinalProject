import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RouteTypes} from '../route-types.enum';
import { HttpClient, HttpParams } from '@angular/common/http';
import {CoursesByDeptView, CoursesByStudentData, CoursesByStudentsView, StudentsView} from './models/view-model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  type: RouteTypes;
  welcomeMsg: string;
  // local
  // serverUrl = 'http://localhost:3000';

  // prod
  serverUrl = 'https://uark-db-project.herokuapp.com';

  errorMsg: string;
  studentsView: StudentsView = new StudentsView();
  coursesByStudentView: CoursesByStudentsView = new CoursesByStudentsView();
  coursesByDeptView: CoursesByDeptView = new CoursesByDeptView();

  constructor(private readonly route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.errorMsg = '';
    this.studentsView.studentDataTableColumns = ['studentId', 'studentName', 'studentMajor'];
    this.coursesByDeptView.departmentCourseDataTableColumns = ['deptCode', 'courseNumber', 'courseTitle', 'creditHours'];
    this.coursesByStudentView.studentCoursesDataTableColumns = ['studentId', 'studentName', 'deptCode', 'courseNumber', 'courseTitle', 'creditHours'];

    this.route.data.subscribe( data => {
      this.type = data.type;
      switch (this.type) {
        case RouteTypes.viewCourseByDept:
          this.welcomeMsg = 'View courses by given Department';
          this.studentsView.viewStudentsScreen = false;
          this.coursesByDeptView.viewDepartmentCourseScreen = true;
          this.coursesByStudentView.viewStudentCoursesScreen = false;
          break;
        case RouteTypes.viewStudent:
          this.welcomeMsg = 'View all students';
          this.studentsView.viewStudentsScreen = true;
          this.coursesByDeptView.viewDepartmentCourseScreen = false;
          this.coursesByStudentView.viewStudentCoursesScreen = false;
          break;
        case RouteTypes.viewCourseByStudent:
          this.welcomeMsg = 'View courses by Student ID';
          this.studentsView.viewStudentsScreen = false;
          this.coursesByDeptView.viewDepartmentCourseScreen = false;
          this.coursesByStudentView.viewStudentCoursesScreen = true;
          break;
        default:
          this.welcomeMsg = 'Unknown view mode encountered';
      }
    });
  }

  verifyDepartment() {
    if (this.coursesByDeptView.department.trim() !== '') {
      this.getDepartmentCourses(this.coursesByDeptView.department);
    }
  }

  verifyStudentId() {
    if (this.coursesByStudentView.studentId.trim() !== '' ) {
      this.getStudentCourses(this.coursesByStudentView.studentId);
    }
  }

  getDepartmentCourses(department) {
    this.http.get(this.serverUrl + '/getDepartmentCourses', { params: { department: `${department}` }}).subscribe((res: object[]) => {
      if (!res.length) {
        this.errorMsg = 'No data found!';
      } else {
        this.errorMsg = '';
      }
      this.coursesByDeptView.departmentCourseData = res;
    });
  }

  getStudentCourses(studentId) {
    this.http.get(this.serverUrl + '/getStudentCourses', { params: { studentId: `${studentId}` }}).subscribe((res: object[]) => {
      if (!res.length) {
        this.errorMsg = 'No data found!';
      } else {
        this.errorMsg = '';
      }
      // @ts-ignore
      this.coursesByStudentView.studentCoursesData = res;
    },
      error => {
        const resObject = JSON.parse(JSON.stringify(error.error));
        alert(`Error getting courses: ${resObject.data.detail}`);
      }
    );
  }

  getStudents() {
    this.http.get(this.serverUrl + '/getStudents').subscribe((res: object[]) => {
      if (!res.length) {
        this.errorMsg = 'No data found!';
      } else {
        this.errorMsg = '';
      }
      this.studentsView.studentData = res;
    },
      error => {
        const resObject = JSON.parse(JSON.stringify(error.error));
        alert(`Error getting courses: ${resObject.data.detail}`);
      }
    );
  }
}
