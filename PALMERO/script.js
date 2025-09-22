class Student {
  constructor(id, name, age, course) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.course = course;
  }

  message() {
    return `I am ${this.name}, ${this.age} years old, and I am enrolled in ${this.course}.`;
  }
}

class Instructor {
  constructor(id, name, subject) {
    this.id = id;
    this.name = name;
    this.subject = subject;
  }

  teach() {
    return `I am ${this.name} and I teach ${this.subject}.`;
  }
}



function fetchDataWithThen() {
  fetch('data/students.json')
    .then(res => res.json())
    .then(data => {
      console.log('Using Promises (.then):', data);
    })
    .catch(err => console.error("Error fetching with .then", err));
}



async function fetchDataWithAsync() {
  try {
    const res = await fetch('data/students.json');
    const data = await res.json();
    console.log("Using Async/Await:", data);
    return data;
  } catch (err) {
    console.error("Error fetching with async/await", err);
  }
}



function displayData(data) {
  const output = document.getElementById('output');
  let html = "";

  html += "<h2>List of Students</h2><ul>";
  data.students.forEach(s => {
    const student = new Student(s.id, s.name, s.age, s.course);
    const ageDisplay = s.age > 21 ? `<b>${s.age}</b>` : s.age;
    html += `<li>${s.name}, Age: ${ageDisplay}, Course: ${s.course}</li>`;
  });
  html += "</ul>";

  html += "<h2>List of Courses</h2><ul>";
  data.courses.forEach(c => {
    html += `<li><strong>${c.title}</strong>: ${c.description}</li>`;
  });
  html += "</ul>";

  html += "<h2>List of Instructors</h2><ul>";
  data.instructors.forEach(i => {
    const instructor = new Instructor(i.id, i.name, i.subject);
    html += `<li>${instructor.teach()}</li>`;
  });
  html += "</ul>";

  html += "<h2>Student to Course Description</h2><ul>";
  data.students.forEach(s => {
    const course = data.courses.find(c => c.title === s.course);
    html += `<li>${s.name} → ${s.course} → ${course ? course.description : 'No description found'}</li>`;
  });
  html += "</ul>";

  html += "<h2>Course to Instructor Matching</h2><ul>";
  data.courses.forEach(course => {
    const matchedInstructor = data.instructors.find(i =>
      course.title.toLowerCase().includes(i.subject.toLowerCase()) ||
      i.subject.toLowerCase().includes(course.title.toLowerCase())
    );
    html += `<li>${course.title} → Taught by ${matchedInstructor ? matchedInstructor.name : "Unknown"}</li>`;
  });
  html += "</ul>";

  output.innerHTML = html;
}


fetchDataWithThen(); 
fetchDataWithAsync().then(displayData); 
    