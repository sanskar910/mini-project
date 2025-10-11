const faculty = [
  { 
    id: 1, 
    name: "prof. Rinku Singh", 
    email: "rinkusingh@university.edu", 
    department: "Computer Science", 
    position: "Professor",
    phone: "+1-234-567-8901",
    subjects: ["Data Structures", "Algorithms", "Machine Learning, ASP.NET"],
    profile: "rinku singh has 15+ years of experience in computer science research with expertise in AI and machine learning. Published 50+ research papers.",
    office: "CS-301",
    officeHours: "Mon-Wed 10 AM-4 PM"
  },
  { 
    id: 2, 
    name: "Prof. Rohan sadhwani", 
    email: "rohan1294@university.edu", 
    department: "Mathematics", 
    position: "Associate Professor",
    phone: "+1-234-567-8902",
    subjects: ["Calculus I", "Calculus II", "Linear Algebra", "Statistics"],
    profile: "Specialized in applied mathematics with focus on statistical modeling and data analysis. 10 years of teaching experience.",
    office: "MATH-205",
    officeHours: "MON-FRI 10 AM-4 PM"
  },
  { 
    id: 3, 
    name: "Prof. Aniket paul", 
    email: "Aniketpaul@university.edu", 
    department: "Python", 
    position: "Assistant Professor",
    phone: "+1-234-567-8903",
    subjects: ["python", "C#"],
    profile: "PYTHON he is master in python and done research in detail all python files with 8 years of academic experience.",
    office: "PY-102",
    officeHours: "Mon-Fri 10 AM-4 PM"
  },
  { 
    id: 4, 
    name: "Prof. Sonali karade", 
    email: "sonali637@university.edu", 
    department: "bid data analytics", 
    position: "Professor",
    phone: "+1-234-567-8904",
    subjects: ["big data analytics", "python", "power bi"],
    profile: "Leading researcher in big data analytics with 20+ years experience. Department head and published author of 3 textbooks.",
    office: "BDA-401",
    officeHours: "MON-Fri 10 AM - 4 PM"
  },
  {
    id: 5,
    name: "Prof. sumit soni",
    email: "sumitsoni@university.edu",
    department: "Computer Science",
    position: "Associate Professor",
    phone: "+1-234-567-8905",
    subjects: ["Database Systems", "Web Development", "Software Engineering"],
    profile: "Industry veteran with 12 years at tech companies before joining academia. Expert in full-stack development and database design.",
    office: "CS-205",
    officeHours: "MON-FRI 10 AM - 4 PM"
  },
  {
    id: 6,
    name: "Dr. manish joshi",
    email: "manish236@university.edu",
    department: "Mathematics",
    position: "Assistant Professor",
    phone: "+1-234-567-8906",
    subjects: ["Discrete Mathematics", "Number Theory", "Cryptography"],
    profile: "PhD in Pure Mathematics with specialization in cryptographic applications. 6 years of research in cybersecurity.",
    office: "MATH-108",
    officeHours: "MON-FRI 10-4 AM"
  }
];

const classrooms = [
  { id: 1, roomNumber: "CS-101", capacity: 30, location: "Computer Science Building", equipment: ["Projector", "Whiteboard", "AC"] },
  { id: 2, roomNumber: "MATH-201", capacity: 40, location: "Mathematics Building", equipment: ["Smart Board", "AC", "Sound System"] },
  { id: 3, roomNumber: "PY-301", capacity: 25, location: "Physics Building", equipment: ["Lab Equipment", "Projector", "Ventilation"] },
  { id: 4, roomNumber: "BDA-401", capacity: 20, location: "Chemistry Building", equipment: ["Fume Hood", "Lab Benches", "Safety Equipment"] },
  { id: 5, roomNumber: "LIB-501", capacity: 50, location: "Library Building", equipment: ["Computers", "Projector", "AC", "WiFi"] }
];

const subjects = [
  { id: 1, name: "Data Structures", code: "CS101", description: "Introduction to data structures and algorithms", credits: 3, department: "Computer Science" },
  { id: 2, name: "Calculus I", code: "MATH101", description: "Differential and integral calculus", credits: 4, department: "Mathematics" },
  { id: 3, name: "Python", code: "PHY101", description: "Mechanics and thermodynamics", credits: 3, department: "Physics" },
  { id: 4, name: "Big data analytics", code: "CHEM201", description: "Structure and reactions of organic compounds", credits: 4, department: "Chemistry" },
  { id: 5, name: "Machine Learning", code: "CS301", description: "Introduction to ML algorithms and applications", credits: 3, department: "Computer Science" },
  { id: 6, name: "Library", code: "MATH201", description: "Vector spaces and linear transformations", credits: 3, department: "Mathematics" }
];

const timetables = [
  { id: 1, facultyId: 1, subjectId: 1, classroomId: 1, day: "Monday", startTime: "09:00", endTime: "10:00", semester: "BCA 5th" },
  { id: 2, facultyId: 2, subjectId: 2, classroomId: 2, day: "Tuesday", startTime: "11:00", endTime: "12:00", semester: "BCA 3th" },
  { id: 3, facultyId: 3, subjectId: 3, classroomId: 3, day: "Wednesday", startTime: "14:00", endTime: "15:00", semester: "BCA 5th" },
  { id: 4, facultyId: 1, subjectId: 5, classroomId: 1, day: "Thursday", startTime: "10:00", endTime: "11:00", semester: "BCA 3th" },
  { id: 5, facultyId: 2, subjectId: 6, classroomId: 2, day: "Friday", startTime: "13:00", endTime: "14:00", semester: "IMCA 5th" }
];

export { faculty, classrooms, subjects, timetables };
export default faculty;