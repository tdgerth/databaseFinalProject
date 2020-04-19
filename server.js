
const { Client } = require('pg');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// local
// const clientCredentials = {
//   user: '',
//   host: '',
//   database: '',
//   password: '',
//   port: 5432,
//   ssl: true
// };
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs, austin needed this for DB connection to work

// prod
const clientCredentials = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
};

const app = express();

// Serve static files....
app.use(express.static(__dirname + '/dist/uark-db-project'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Send normal request to index.html
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/uark-db-project/index.html'));
});

app.post('/addStudent', (req, res) => {
  const client = new Client(clientCredentials);

  client.connect((err, client, done) => {
    if (err) {
      console.log(err);
      res.status(500).json({success: false, data: err});
    }
    const insertStudentQuery = client.query(`INSERT INTO students (StudentName, Major) VALUES ('${req.body.studentName}', '${req.body.studentMajor}')`, (error, results) => {
      if (error) {
        res.status(500).json({success: false, data: error});
        return;
      }
      res.status(200).json({success: true, data: req.body.studentName});
    });
  });
});

app.post('/addCourse', (req, res) => {
  const client = new Client(clientCredentials);
  client.connect((err, client, done) => {
    if (err) {
      res.status(500).json({success: false, data: err});
    }
    const insertCourseQuery = client.query(`INSERT INTO courses VALUES ('${req.body.courseDeptCode.toUpperCase()}', '${req.body.courseNumber}', '${req.body.courseTitle}', ${req.body.courseCreditHours})`, (error, results) => {
      if (error) {
        res.status(500).json({success: false, data: error});
        return;
      }
      res.status(200).json({success: true, data: req.body});
    });
  });
});

app.post('/addApplication', (req, res) => {
  const client = new Client(clientCredentials);
  client.connect((err, client, done) => {
    if (err) {
      return res.status(500).json({success: false, data: err});
    }
    const insertApplicationQuery = client.query(`INSERT INTO enrollments VALUES(${req.body.applicationStudentId}, '${req.body.applicationDeptCode.toUpperCase()}', '${req.body.applicationCourseNumber}')`, (error, results) => {
      if (error) {
        res.status(500).json({success: false, data: error});
        return;
      }
      res.status(200).json({success: true, data: req.body});
    });
  });
});

app.get('/getStudents', (req, res) => {
  const client = new Client(clientCredentials);
  client.connect((err, client, done) => {
    if (err) {
      return res.status(500).json({success: false, data: err});
    }
    const studentsQuery = client.query('SELECT * FROM students', (error, results) => {
      if (error) {
        res.status(500).json({success: false, data: error});
        return;
      }
      res.status(200).json(results.rows);
    });
  });
});

app.get('/getStudentCourses', (req, res) => {
  let studentId = req.query.studentId;
  const client = new Client(clientCredentials);
  client.connect((err, client, done) => {
    if (err) {
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    //const query = client.query(`SELECT * FROM (Courses C JOIN Enrollments E ON C.DeptCode = E.DeptCode AND C.CourseNum = E.CourseNum) AS X WHERE X.StudentId = ${studentId}`, (error, results) => {
    const query = client.query(`select students.studentID, students.StudentName, courses.deptCode, courses.courseNum, courses.title, courses.creditHours from courses INNER JOIN enrollments ON courses.DeptCode = enrollments.DeptCode AND courses.CourseNum = enrollments.CourseNum INNER JOIN students ON students.studentid = ${studentId} WHERE enrollments.studentid = ${studentId}`, (error, results) => {
      if (error) {
        res.status(500).json({success: false, data: error});
        return;
      }
      res.status(200).json(results.rows);
    });
  });
});

app.get('/getDepartmentCourses', (req, res) => {
  let department = req.query.department;
  const client = new Client(clientCredentials);
  client.connect((err, client, done) => {
    if (err) {
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    const studentsQuery = client.query(`SELECT * FROM Courses WHERE Courses.DeptCode = '${department.toUpperCase()}'`, (error, results) => {
      if (error) {
        res.status(500).json({success: false, data: error});
        return;
      }
      res.status(200).json(results.rows);
    });
  });
});

// default Heroku PORT
app.listen(process.env.PORT || 3000);
