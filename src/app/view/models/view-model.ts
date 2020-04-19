export class StudentsView {
  viewStudentsScreen: boolean;
  studentData: any[];
  studentDataTableColumns: any[];
}

export class CoursesByDeptView {
  viewDepartmentCourseScreen: boolean;
  departmentCourseData: any[];
  departmentCourseDataTableColumns: any[];
  department: string;
}

export class CoursesByStudentsView {
  viewStudentCoursesScreen: boolean;
  studentCoursesData: CoursesByStudentData[];
  studentCoursesDataTableColumns: any[];
  studentId: string;
}

export class CoursesByStudentData {
  studentid: string;
  studentname: string;
  deptcode: string;
  coursenum: string;
  title: string;
  credithours: string;
}
