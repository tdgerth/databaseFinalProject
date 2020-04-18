# Front End

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Website
Heroku is automatically tracking master branch and will automatically deploy new pushes to master. Production app can be accessed from https://uarkdbproject.herokuapp.com/

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# Database

## Command Line Database Access

make sure postgreSQL is installed. Use the command 
`psql -h xxxxxxxxxxxxxxxxxx -d xxxxxxxxxx -U xxxxxxxx` with values of fields Host, Database, User found on data.heroku.com Settings > Database Credentials. It will ask for password, use Password value found in Database Credentials. 

# SQL Schema
Current Database Schema is setup like so:
```
CREATE TABLE Students (
	StudentId SERIAL PRIMARY KEY,
	StudentName VARCHAR (50) NOT NULL DEFAULT 'Default Name',
	Major VARCHAR (50) NOT NULL DEFAULT 'Undeclared'
);

INSERT INTO Students (StudentName, Major) VALUES
	('Tyler Tracy', 'Computer Science'),
	('Tyler Gerth', 'Computer Science'),
	('Austin Chitmon', 'Computer Science'),
	('Matt Dodd', 'Philosophy'),
	('Miakel Borge', 'Mechanical Engineering'),
	('Megan Mitchell', 'Chemical Engineering'),
	('Hannah Thornton', 'Chemical Engineering'),
	('Rebecca Widdowson', 'Biological Engineering'),
	('Aby Martinez', 'Management'),
	('Melissa Flores', 'Psychology'),
	('Cassidy Stout', 'Computer Engineering'),
	('Jason Miller', 'Philosophy'),
	('John Miller', 'Philosophy'),
	('Tina Mitchell', 'Chemical Engineering'),
	('Matt Reeves', 'Psychology'),
	('Will Cross', 'Management'),
	('Beau Cross', 'Computer Science');

	CREATE TABLE Departments (
	DeptCode CHAR(4) PRIMARY KEY,
	DeptName VARCHAR(50) NOT NULL
);

	INSERT INTO Departments VALUES
	('CSCE','Computer Science/Engineering'),
	('PHIL','Philosophy'),
	('MEEG','Mechanical Engineering'),
	('CHEG','Chemical Engineering'),
	('BENG','Biological Engineering'),
	('MGMT','Management'),
	('PSYC','Psychology');

CREATE TABLE Courses (
	DeptCode CHAR(4) REFERENCES Departments(DeptCode),
	CourseNum CHAR(4) NOT NULL DEFAULT '0000',
	Title VARCHAR (50) NOT NULL DEFAULT 'Default Course',
	CreditHours CHAR(1) NOT NULL DEFAULT '0',
	PRIMARY KEY(DeptCode, CourseNum)
);

INSERT INTO Courses VALUES 
	('CSCE', '2003', 'Programming Foundations I', '4'),
	('CSCE', '2013', 'Programming Foundations II', '4'),
	('CSCE', '4523', 'Database Management Systems', '3'),
	('CSCE', '4543', 'Software Architecture', '3'),
	('CSCE', '4613', 'Artificial Intelligence', '3'),
	('CSCE', '4433', 'Cryptography', '3'),
	('PHIL', '2003', 'Introduction to Philosophy', '3'),
	('PHIL', '2013', 'Logic', '3'),
	('PHIL', '3253', 'Metaphysics', '3'),
	('MEEG', '4323', 'Heat Mechanics', '4'),
	('CHEG', '3253', 'Reactors', '4'),
	('BENG', '4663', ' Sustainable Biosystems Designs', '4'),
	('MGMT', '2103', 'Managing People and Organizations', '3'),
	('PSYC', '2003', 'General Psychology', '3'),
	('PSYC', '2013', 'Statistics for Psychology', '3');

CREATE TABLE Enrollments (
	StudentId INTEGER REFERENCES Students(StudentId),
	DeptCode CHAR(4) REFERENCES Departments(DeptCode),
	CourseNum CHAR(4) NOT NULL,
	PRIMARY KEY(StudentId, DeptCode, CourseNum)
);

INSERT INTO Enrollments VALUES 
	(3, 'CSCE', '4543'),
	(3, 'CSCE', '4523'),
	(3, 'CSCE', '4433'),
	(3, 'PHIL', '3253'),
	(3, 'PHIL', '2013');
```
