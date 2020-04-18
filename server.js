
const { Client } = require('pg');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const clientCredentials = {
  user: 'grhsssepqenmwa',
  host: 'ec2-3-234-109-123.compute-1.amazonaws.com',
  database: 'd7ecpq3ej6nkqm',
  password: '32b270837ef41fda1db1e4b44efef0a1462c2d3893b54a63a8edeb296d2870e3',
  port: 5432,
  ssl: true
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
      return res.status(500).json({success: false, data: err});
    }
    const insertStudentQuery = client.query(`INSERT INTO students (StudentName, Major) VALUES ('${req.body.studentName}', '${req.body.studentMajor}')`, (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results.rows);
      res.status(200);
    });
  });
});

app.post('/addCourse', (req, res) => {
  const client = new Client(clientCredentials);
  client.connect((err, client, done) => {
    if (err) {
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    const insertCourseQuery = client.query(`INSERT INTO courses VALUES('${req.body.courseDeptCode.toUpperCase()}', '${req.body.courseNum}', '${req.body.courseTitle}', '${req.body.courseCreditHours}')`, (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results.rows);
      res.status(200);
    });
  });
});

app.post('/addApplication', (req, res) => {
  const client = new Client(clientCredentials);
  client.connect((err, client, done) => {
    if (err) {
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    console.log(`INSERT INTO enrollments VALUES(${req.body.applicationStudentId}, '${req.body.applicationDeptCode.toUpperCase()}', '${req.body.applicationCourseNumber}')`)
    const insertApplicationQuery = client.query(`INSERT INTO enrollments VALUES(${req.body.applicationStudentId}, '${req.body.applicationDeptCode.toUpperCase()}', '${req.body.applicationCourseNumber}')`, (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results.rows);
      res.status(200);
    });
  });
});

app.get('/getStudents', (req, res) => {
  const client = new Client(clientCredentials);
  client.connect((err, client, done) => {
    if (err) {
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    const studentsQuery = client.query('SELECT * FROM students', (error, results) => {
      if (error) {
        throw error;
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
    const query = client.query(`SELECT * FROM (Courses C JOIN Enrollments E ON C.DeptCode = E.DeptCode AND C.CourseNum = E.CourseNum) AS X WHERE X.StudentId = ${studentId}`, (error, results) => {  
      if (error) {
        throw error;
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
        throw error;
      }
      res.status(200).json(results.rows);
    });
  });
});

// default Heroku PORT
app.listen(process.env.PORT || 3000);
