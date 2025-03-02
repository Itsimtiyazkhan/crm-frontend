const API_URL = "http://localhost:5000/api/";

export const registerSuperAdmin = async (data) => {
  const response = await fetch(`${API_URL}superadmin/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const loginSuperAdmin = async ({ email, password }) => {
  const response = await fetch(`${API_URL}superadmin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const fetchStats = async (token) => {
  const res = await fetch(`${API_URL}superadmin/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
  // const data = await res.json();
  // setStats(data);
};
export const fetchSuperAdminDashboard = async (token) => {
  const response = await fetch(`${API_URL}superadmin/dashboard`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};

export const fetchSchools = async (token) => {
  const response = await fetch(`${API_URL}school/schools`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

export const deleteSchool = async (id, token) => {
  const response = await fetch(`${API_URL}school/schools/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const addSchool = async (school, token) => {
  const response = await fetch(`${API_URL}school/schools`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(school),
  });
  return response.json();
};

export const updateSchool = async (id, schoolData, token) => {
  const response = await fetch(`${API_URL}school/schools/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(schoolData),
  });
  return response.json();
};

// -----------------------------teacher------------
export const getTeachers = async (token) => {
  const response = await fetch(`${API_URL}teachers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const getTeacherById = async (id, token) => {
  const response = await fetch(`${API_URL}teachers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const addTeacher = async (teacherData, token) => {
  const response = await fetch(`${API_URL}teachers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(teacherData),
  });
  return response.json();
};

export const updateTeacher = async (id, teacherData, token) => {
  const response = await fetch(`${API_URL}teachers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(teacherData),
  });
  return response.json();
};

export const deleteTeacher = async (id, token) => {
  const response = await fetch(`${API_URL}teachers/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

// --------------------------student
export const fetchStudents = async (token) => {
  const response = await fetch(`${API_URL}students`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
};

export const fetchStudentById = async (id, token) => {
  const response = await fetch(`${API_URL}students/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
};

export const addStudent = async (studentData, token) => {
  const response = await fetch(`${API_URL}students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(studentData),
  });
  return await response.json();
};

export const updateStudent = async (id, studentData, token) => {
  const response = await fetch(`${API_URL}students/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(studentData),
  });
  return await response.json();
};

export const deleteStudent = async (id, token) => {
  await fetch(`${API_URL}students/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};

// --------------------------class---

export const fetchClasses = async (token) => {
  const response = await fetch(`${API_URL}classes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
};

export const addClass = async (classData, token) => {
  const response = await fetch(`${API_URL}classes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(classData),
  });
  return await response.json();
};

export const updateClass = async (id, classData, token) => {
  const response = await fetch(`${API_URL}classes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(classData),
  });
  return await response.json();
};

export const deleteClass = async (id, token) => {
  await fetch(`${API_URL}classes/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};

// -------------subjects-----------

export const fetchSubjects = async (token) => {
  const response = await fetch(`${API_URL}subjects`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
};

export const addSubject = async (subjectData, token) => {
  const response = await fetch(`${API_URL}subjects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(subjectData),
  });
  return await response.json();
};

export const updateSubject = async (id, subjectData, token) => {
  const response = await fetch(`${API_URL}subjects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(subjectData),
  });
  return await response.json();
};

export const deleteSubject = async (id, token) => {
  await fetch(`${API_URL}subjects/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ------------attandance -------------

export const fetchAttendance = async (token) => {
  const response = await fetch(`${API_URL}attendance`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
};

export const addAttendance = async (attendanceData, token) => {
  const response = await fetch(`${API_URL}attendance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(attendanceData),
  });
  return await response.json();
};

export const updateAttendance = async (id, attendanceData, token) => {
  const response = await fetch(`${API_URL}attendance/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(attendanceData),
  });
  return await response.json();
};

export const deleteAttendance = async (id, token) => {
  await fetch(`${API_URL}attendance/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};

// -------------------------exams------

export const fetchExams = async (token) => {
  const response = await fetch(`${API_URL}exams`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
};

export const addExam = async (examData, token) => {
  const response = await fetch(`${API_URL}exams`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(examData),
  });
  return await response.json();
};

export const updateExam = async (id, examData, token) => {
  const response = await fetch(`${API_URL}exams/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(examData),
  });
  return await response.json();
};

export const deleteExam = async (id, token) => {
  await fetch(`${API_URL}exams/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ------------fess--------------

export const fetchFees = async (token) => {
  const response = await fetch(`${API_URL}fees`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
};

export const addFee = async (feeData, token) => {
  const response = await fetch(`${API_URL}fees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(feeData),
  });
  return await response.json();
};

export const updateFee = async (id, feeData, token) => {
  const response = await fetch(`${API_URL}fees/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(feeData),
  });
  return await response.json();
};

export const deleteFee = async (id, token) => {
  await fetch(`${API_URL}fees/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateFeeStatus = async (id, status, token) => {
  await axios.patch(
    `${API_URL}/fees/${id}`, // Replace API_URL with your actual backend API URL
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// -------------------- report  service ----------------

export const fetchReports = async (token) => {
  const response = await fetch(`${API_URL}reports`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
};

export const addReport = async (reportData, token) => {
  const response = await fetch(`${API_URL}reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reportData),
  });
  return await response.json();
};

export const updateReport = async (id, reportData, token) => {
  const response = await fetch(`${API_URL}reports/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reportData),
  });
  return await response.json();
};

export const deleteReport = async (id, token) => {
  await fetch(`${API_URL}reports/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ----------------timetable--------------

export const fetchTimetables = async (token) => {
  const response = await fetch(`${API_URL}timetables`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
};

export const addTimetable = async (timetableData, token) => {
  const response = await fetch(`${API_URL}timetables`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(timetableData),
  });
  return await response.json();
};

export const updateTimetable = async (id, timetableData, token) => {
  const response = await fetch(`${API_URL}timetables/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(timetableData),
  });
  return await response.json();
};

export const deleteTimetable = async (id, token) => {
  await fetch(`${API_URL}timetables/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};

// -------------library management -----------------

export const fetchBooks = async (token) => {
  const response = await fetch(`${API_URL}library`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
};

export const addBook = async (bookData, token) => {
  const response = await fetch(`${API_URL}library`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });
  return await response.json();
};

export const updateBook = async (id, bookData, token) => {
  const response = await fetch(`${API_URL}library/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });
  return await response.json();
};

export const deleteBook = async (id, token) => {
  await fetch(`${API_URL}library/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};
// ---------------bus service ---------------

export const fetchTransports = async (token) => {
  const response = await fetch(`${API_URL}transport`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
};

export const addTransport = async (data, token) => {
  const response = await fetch(`${API_URL}transport`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const updateTransport = async (id, data, token) => {
  const response = await fetch(`${API_URL}transport/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const deleteTransport = async (id, token) => {
  await fetch(`${API_URL}transport/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ------------------assignment --------------

export const fetchAssignments = async (token) => {
  const response = await fetch(`${API_URL}assignments`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
};

export const addAssignment = async (data, token) => {
  const response = await fetch(`${API_URL}assignments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const updateAssignment = async (id, data, token) => {
  const response = await fetch(`${API_URL}assignments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const deleteAssignment = async (id, token) => {
  await fetch(`${API_URL}assignments/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};
// ---------------------report card --------------

export const fetchReportCards = async (token) => {
  const response = await fetch(`${API_URL}report-cards`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
};

export const addReportCard = async (data, token) => {
  const response = await fetch(`${API_URL}report-cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const updateReportCard = async (id, data, token) => {
  const response = await fetch(`${API_URL}report-cards/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const deleteReportCard = async (id, token) => {
  await fetch(`${API_URL}report-cards/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};
// ---------------------- student progress-

export const fetchStudentProgress = async (studentId, token) => {
  const response = await fetch(`${API_URL}student-progress/${studentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
};
