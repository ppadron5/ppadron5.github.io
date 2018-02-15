function setup() {
  makeCourseRows(students[0]);
}

function makeCourseRows(student) {
  student.courses.forEach(function (course) {
    row = document.createElement('tr');
    cell = document.createElement('td');
    cell.innerHTML = course.courseName;
    row.appendChild(cell);
    document.getElementById('courseRows').appendChild(row);
  });
}
