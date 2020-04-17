import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RouteTypes} from '../route-types.enum';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  type: RouteTypes;
  welcomeMsg: string;
  serverUrl = 'http://localhost:3000';

  // View Students Variables
  viewStudentsScreen: boolean;
  studentData = [];
  studentDataTableColumns = ['studentId', 'studentName', 'studentMajor'];

  // View Courses from Department
  viewDepartmentCourseScreen: boolean;
  departmentCourseData = [];
  departmentCourseDataTableColumns = ['deptCode', 'courseNumber', 'courseTitle', 'creditHours'];
  department: string;

  // View Courses for Students
  viewStudentCoursesScreen: boolean;
  studentCoursesData = [];
  studentCoursesDataTableColumns = ['deptCode', 'courseNumber', 'courseTitle', 'creditHours'];
  studentId: string;

  constructor(private readonly route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.data.subscribe( data => {
      this.type = data.type;
      switch (this.type) {
        case RouteTypes.viewCourseByDept:
          this.welcomeMsg = 'View courses by given Department';
          this.viewStudentsScreen = false;
          this.viewDepartmentCourseScreen = true;
          this.viewStudentCoursesScreen = false;
          break;
        case RouteTypes.viewStudent:
          this.welcomeMsg = 'View all students';
          this.viewStudentsScreen = true;
          this.viewDepartmentCourseScreen = false;
          this.viewStudentCoursesScreen = false;
          break;
        case RouteTypes.viewCourseByStudent:
          this.welcomeMsg = 'View courses by Student Name';
          this.viewStudentsScreen = false;
          this.viewDepartmentCourseScreen = false;
          this.viewStudentCoursesScreen = true;
          break;
        default:
          this.welcomeMsg = 'Unknown view mode encountered';
      }
    });
  }

  verifyDepartment() {
    if (this.department.trim() !== '') {
      this.getDepartmentCourses(this.department);
    }
  }

  verifyStudentId() {
    if (this.studentId.trim() !== '' ) {
      this.getStudentCourses(this.studentId);
    }
  }

  getDepartmentCourses(department) {

    this.http.get(this.serverUrl + '/getDepartmentCourses', { params: { department: `${department}` }}).subscribe((res: object[]) => {
      this.departmentCourseData = res;
    });
  }

  getStudentCourses(studentId) {
    this.http.get(this.serverUrl + '/getStudentCourses', { params: { studentId: `${studentId}` }}).subscribe((res: object[]) => {
      console.log(res);
      this.studentCoursesData = res;
    });
  }

  getStudents() {
    this.http.get(this.serverUrl + '/getStudents').subscribe((res: object[]) => {
      this.studentData = res;
    });
  }
}
