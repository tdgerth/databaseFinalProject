
const { Client } = require('pg');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const clientCredentials = {
  user: 'utpqralljqxrdn',
  host: 'ec2-3-223-21-106.compute-1.amazonaws.com',
  database: 'd2otma7f5g1or7',
  password: 'a56266ed55ed80c76fffe4f5ff97f5881b507bf6a57195c365e80db98e4ac59a',
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
    const insertCourseQuery = client.query(`INSERT INTO courses('${req.body.courseDeptCode}', ${req.body.courseNumber}, ${req.body.courseTitle}, ${req.body.courseCreditHours})`, (error, results) => {
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
    const insertApplicationQuery = client.query(`INSERT INTO enrollments('${req.body.applicationStudentId}', ${req.body.applicationDeptCode}, ${req.body.applicationCourseNum})`, (error, results) => {
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
