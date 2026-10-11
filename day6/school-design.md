# Day 6 Assignment - School Database

## 1. Students Table

The `students` table stores information about students.

It contains:

- `id` - the primary key that uniquely identifies each student.
- `name` - the student's name.
- `email` - the student's email address.

The email column is `UNIQUE`, so two students cannot have the same email address.

---

## 2. Courses Table

The `courses` table stores information about courses.

It contains:

- `id` - the primary key that uniquely identifies each course.
- `name` - the name of the course.

---

## 3. Enrolments Table

The `enrolments` table records which students are enrolled in which courses.

It contains:

- `id` - the primary key.
- `student_id` - a foreign key pointing to `students.id`.
- `course_id` - a foreign key pointing to `courses.id`.
- `grade` - the student's grade for the course.

The `enrolments` table also has a `UNIQUE (student_id, course_id)` rule. This prevents the same student from being enrolled in the same course twice.

---

## 4. Relationships

There is a one-to-many relationship between students and enrolments.

One student can have many enrolments, but each enrolment belongs to one student.

There is also a one-to-many relationship between courses and enrolments.

One course can have many enrolments, but each enrolment belongs to one course.

Together, students and courses have a many-to-many relationship.

A student can take many courses, and a course can have many students.

The `enrolments` table is needed as a join table because it connects students and courses.

It also stores extra information about the relationship, such as the student's grade.

---

## 5. Index

I would add an index on `enrolments.student_id`.

The index makes it faster to find all enrolments belonging to a particular student.

The SQL used is:

```sql
CREATE INDEX idx_enrolments_student_id
ON enrolments(student_id);
```
