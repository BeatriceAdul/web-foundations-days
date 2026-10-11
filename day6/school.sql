-- ============================================
-- DAY 6 ASSIGNMENT: A SCHOOL DATABASE
-- ============================================

-- --------------------------------------------
-- 1. CREATE TABLES
-- --------------------------------------------

CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);

CREATE TABLE courses (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE enrolments (
    id INTEGER PRIMARY KEY,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    grade TEXT,

    -- Prevent the same student from enrolling
    -- in the same course more than once
    UNIQUE (student_id, course_id),

    -- Link student_id to students.id
    FOREIGN KEY (student_id)
        REFERENCES students(id)
        ON DELETE CASCADE,

    -- Link course_id to courses.id
    FOREIGN KEY (course_id)
        REFERENCES courses(id)
        ON DELETE CASCADE
);


-- --------------------------------------------
-- 2. INSERT STUDENTS
-- --------------------------------------------

INSERT INTO students (name, email)
VALUES
    ('Amina Otieno', 'amina@example.com'),
    ('Brian Kamau', 'brian@example.com'),
    ('Cynthia Achieng', 'cynthia@example.com'),
    ('David Ochieng', 'david@example.com');


-- --------------------------------------------
-- 3. INSERT COURSES
-- --------------------------------------------

INSERT INTO courses (name)
VALUES
    ('Web Development'),
    ('Database Systems'),
    ('JavaScript Programming');


-- --------------------------------------------
-- 4. INSERT ENROLMENTS
-- --------------------------------------------

INSERT INTO enrolments (student_id, course_id, grade)
VALUES
    (1, 1, 'A'),
    (1, 2, 'B'),
    (2, 1, 'B'),
    (2, 3, 'A'),
    (3, 2, 'A'),
    (3, 3, 'B');


-- --------------------------------------------
-- 5. QUERY: ALL COURSES FOR ONE STUDENT
-- --------------------------------------------
-- Example: Amina Otieno

SELECT
    students.name AS student_name,
    courses.name AS course_name,
    enrolments.grade
FROM students
JOIN enrolments
    ON students.id = enrolments.student_id
JOIN courses
    ON courses.id = enrolments.course_id
WHERE students.name = 'Amina Otieno';


-- --------------------------------------------
-- 6. QUERY: ALL STUDENTS ON ONE COURSE
-- --------------------------------------------
-- Example: Web Development

SELECT
    courses.name AS course_name,
    students.name AS student_name,
    enrolments.grade
FROM courses
JOIN enrolments
    ON courses.id = enrolments.course_id
JOIN students
    ON students.id = enrolments.student_id
WHERE courses.name = 'Web Development';


-- --------------------------------------------
-- 7. QUERY: NUMBER OF STUDENTS PER COURSE
-- --------------------------------------------

SELECT
    courses.name AS course_name,
    COUNT(enrolments.student_id) AS student_count
FROM courses
LEFT JOIN enrolments
    ON courses.id = enrolments.course_id
GROUP BY courses.id, courses.name;


-- --------------------------------------------
-- 8. QUERY: STUDENTS WHO HAVE NO ENROLMENTS
-- --------------------------------------------

SELECT
    students.id,
    students.name,
    students.email
FROM students
LEFT JOIN enrolments
    ON students.id = enrolments.student_id
WHERE enrolments.id IS NULL;


-- --------------------------------------------
-- 9. UPDATE ONE ENROLMENT'S GRADE
-- --------------------------------------------

UPDATE enrolments
SET grade = 'A+'
WHERE student_id = 1
  AND course_id = 2;


-- --------------------------------------------
-- 10. CHECK THE UPDATED ENROLMENT
-- --------------------------------------------

SELECT
    students.name AS student_name,
    courses.name AS course_name,
    enrolments.grade
FROM enrolments
JOIN students
    ON students.id = enrolments.student_id
JOIN courses
    ON courses.id = enrolments.course_id
WHERE student_id = 1
  AND course_id = 2;


-- --------------------------------------------
-- 11. OPTIONAL INDEX
-- --------------------------------------------
-- This makes searches by student_id faster.

CREATE INDEX idx_enrolments_student_id
ON enrolments(student_id);