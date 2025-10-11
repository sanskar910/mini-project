import express from "express"
import { faculty, timetables, subjects, classrooms } from "./user.js"

const app = express()

app.use(express.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.get("/", (req, res)=> {
    res.send("server is ready")
})

app.get("/api/user", (req, res)=> {
    res.send(faculty)
})

// Login endpoint
app.post("/api/login", (req, res) => {
  const { email, password, role } = req.body;
  
  const facultyCredentials = {
    'rinkusingh@university.edu': { password: 'rinku123', id: 1 },
    'rohan1294@university.edu': { password: 'rohan123', id: 2 },
    'Aniketpaul@university.edu': { password: 'aniket123', id: 3 },
    'sonali637@university.edu': { password: 'sonali123', id: 4 },
    'sumitsoni@university.edu': { password: 'sumit123', id: 5 },
    'manish236@university.edu': { password: 'manish123', id: 6 }
  };
  
  const adminCredentials = {
    'admin@university.edu': { password: 'admin123', id: 'admin' }
  };
  
  if (role === 'faculty') {
    const facultyAuth = facultyCredentials[email];
    if (facultyAuth && facultyAuth.password === password) {
      const facultyData = faculty.find(f => f.id === facultyAuth.id);
      res.json({ success: true, role, facultyId: facultyAuth.id, facultyData });
    } else {
      res.status(401).json({ success: false, message: 'Invalid faculty credentials' });
    }
  } else if (role === 'admin') {
    const adminAuth = adminCredentials[email];
    if (adminAuth && adminAuth.password === password) {
      res.json({ success: true, role, adminId: adminAuth.id });
    } else {
      res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }
  } else {
    res.status(400).json({ success: false, message: 'Invalid role' });
  }
});

// Get faculty timetable
app.get("/api/faculty/:id/timetable", (req, res) => {
  const facultyId = parseInt(req.params.id);
  const facultyTimetable = timetables
    .filter(t => t.facultyId === facultyId)
    .map(timetable => {
      const subject = subjects.find(s => s.id === timetable.subjectId);
      const classroom = classrooms.find(c => c.id === timetable.classroomId);
      
      return {
        ...timetable,
        subjectName: subject?.name || 'Unknown Subject',
        subjectCode: subject?.code || 'N/A',
        classroomNumber: classroom?.roomNumber || 'TBA',
        location: classroom?.location || 'TBA'
      };
    });
  
  res.json(facultyTimetable);
});

// Get all timetables
app.get("/api/timetables", (req, res) => {
  res.json(timetables);
});

const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`server at http://localhost:${port}`)
})