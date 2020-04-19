import { Component, OnInit } from '@angular/core';
import {RouteTypes} from '../route-types.enum';
import {ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  type: RouteTypes;
  welcomeMsg: string;
  serverUrl = 'http://localhost:3000';

  // Add Student Variables
  addStudentScreen: boolean;
  studentName: string;
  studentMajor: string;

  // Add Course Variables
  addCourseScreen: boolean;
  courseDeptCode: string;
  courseNumber: number;
  courseTitle: string;
  courseCreditHours: number;

  // Add Application Variables
  addApplicationScreen: boolean;
  applicationStudentId: number;
  applicationDeptCode: string;
  applicationCourseNumber: number;

  constructor(private readonly route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.data.subscribe( data => {
      this.type = data.type;
      switch (this.type) {
        case RouteTypes.addStudent:
          this.addStudentScreen = true;
          this.addCourseScreen = false;
          this.addApplicationScreen = false;
          this.welcomeMsg = 'Add student to student table';
          break;
        case RouteTypes.addCourse:
          this.addStudentScreen = false;
          this.addCourseScreen = true;
          this.addApplicationScreen = false;
          this.welcomeMsg = 'Add course to course table';
          break;
        case RouteTypes.addApplication:
          this.addStudentScreen = false;
          this.addCourseScreen = false;
          this.addApplicationScreen = true;
          this.welcomeMsg = 'Add application to enrollment table';
          break;
        default:
          this.addStudentScreen = false;
          this.addCourseScreen = false;
          this.addApplicationScreen = false;
          this.welcomeMsg = 'Unknown add mode encountered';
      }
    });
  }

  verifyStudent() {
    if (this.studentName.trim() !== '' && this.studentName.trim() !== '') {
      if (this.studentName.trim() !== '') {
        this.addStudent();
      }
    }
  }

  verifyCourse() {
    if (this.courseDeptCode.trim() !== '') {
      if (this.courseNumber > 0) {
        if (this.courseTitle.trim() !== '') {
          if (this.courseCreditHours > 0) {
            this.addCourse();
          }
        }
      }
    }
  }

  verifyApplication() {
    if (this.applicationStudentId > 0) {
      if (this.applicationDeptCode.trim() !== '') {
        if (this.applicationCourseNumber > 0) {
          this.addApplication();
        }
      }
    }
  }

  addStudent() {
    console.log('here');
    const studentToAdd = {
      studentName: this.studentName,
      studentMajor: this.studentMajor
    };
    this.http.post(this.serverUrl + '/addStudent', studentToAdd).subscribe(() => {
      console.log('added student');
    });
  }

  addCourse() {
    const courseToAdd = {
      courseDeptCode: this.courseDeptCode,
      courseNumber: this.courseNumber,
      courseTitle: this.courseTitle,
      courseCreditHours: this.courseCreditHours
    };
    this.http.post(this.serverUrl + '/addCourse', courseToAdd).subscribe(() => {
      console.log('added course');
    });
  }

  addApplication() {
    const applicationToAdd = {
      applicationDeptCode: this.applicationDeptCode,
      applicationCourseNumber: this.applicationCourseNumber,
      applicationStudentId: this.applicationStudentId
    };
    this.http.post(this.serverUrl + '/addApplication', applicationToAdd).subscribe(() => {
      console.log('added application');
    });
  }

}
