import { useState, useEffect } from "react";
import {
  fetchAttendance,
  addAttendance,
  updateAttendance,
  fetchStudents,
  fetchClasses,
} from "../../service/Api";
import styles from "../../styles/Attendance.module.css";
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [attendanceData, setAttendanceData] = useState({});
  const [viewMode, setViewMode] = useState("");

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    const token = localStorage.getItem("token");
    setAttendance(await fetchAttendance(token));
    setStudents(await fetchStudents(token));
    setClasses(await fetchClasses(token));
  };

  useEffect(() => {
    if (!selectedClass) return;
    initializeAttendance();
  }, [selectedClass, students, attendance]);

  const initializeAttendance = () => {
    const filteredStudents = students.filter(
      (student) =>
        student.class_name.trim() ===
        classes.find((cls) => cls.id == selectedClass)?.name.trim()
    );
    const initialAttendance = {};
    filteredStudents.forEach((student) => {
      initialAttendance[student.id] =
        attendance.find((a) => a.studentId === student.id)?.status || "Present";
    });
    setAttendanceData(initialAttendance);
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceData((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const attendanceEntries = Object.keys(attendanceData).map((studentId) => ({
      studentId,
      classId: selectedClass,
      date: selectedDate,
      status: attendanceData[studentId],
    }));

    for (const entry of attendanceEntries) {
      const existingRecord = attendance.find(
        (a) =>
          a.studentId == entry.studentId &&
          a.classId == selectedClass &&
          a.date === selectedDate
      );
      existingRecord
        ? await updateAttendance(existingRecord.id, entry, token)
        : await addAttendance(entry, token);
    }
    loadInitialData();
  };

  const filteredAttendance = attendance.filter(
    (record) => record.date === selectedDate && record.classId == selectedClass
  );

  return (
    <SuperAdminLayout>
      <div className={styles.container}>
        <h2>Manage Attendance</h2>

        {/* Class Selection */}
        <label>Select Class:</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name} ({cls.section})
            </option>
          ))}
        </select>

        {/* Mode Selection */}
        {selectedClass && (
          <div>
            <button onClick={() => setViewMode("mark")}>Mark Attendance</button>
            <button onClick={() => setViewMode("view")}>View Attendance</button>
          </div>
        )}

        {/* Mark Attendance */}
        {viewMode === "mark" && selectedClass && (
          <form onSubmit={handleSubmit}>
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>class name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {students
                  .filter(
                    (s) =>
                      s.class_name.trim() ===
                      classes
                        .find((cls) => cls.id == selectedClass)
                        ?.name.trim()
                  )
                  .map((student) => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.class_name}</td>
                      <td>
                        <select
                          value={attendanceData[student.id] || "Present"}
                          onChange={(e) =>
                            handleAttendanceChange(student.id, e.target.value)
                          }
                        >
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                          <option value="Late">Late</option>
                        </select>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <button type="submit">Save Attendance</button>
          </form>
        )}

        {/* View Attendance */}
        {viewMode === "view" && selectedClass && (
          <div>
            <label>Select Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <table>
              <thead>
                <tr className="">
                  <th>Student Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendance.map((record) => {
                  const student = students.find(
                    (s) => s.id === record.studentId
                  );
                  return (
                    <tr key={record.id}>
                      <td>{student?.name || "Unknown"}</td>
                      <td>{record.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </SuperAdminLayout>
  );
};

export default Attendance;
