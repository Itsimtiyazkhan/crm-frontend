import { useState, useEffect } from "react";
import {
  fetchReportCards,
  addReportCard,
  updateReportCard,
  deleteReportCard,
  fetchStudents,
  fetchClasses,
  fetchSubjects,
  getTeachers,
} from "../../service/Api";

import styles from "../../styles/ReportCards.module.css"; // Importing CSS Module
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";

const ReportCards = () => {
  const [reportCards, setReportCards] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [reportData, setReportData] = useState({
    student_id: "",
    class_id: "",
    subject_id: "",
    teacher_id: "",
    marks_obtained: "",
    total_marks: "",
    grade: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadReportCards();
    loadStudents();
    loadClasses();
    loadTeachers();
  }, []);

  const loadReportCards = async () => {
    const data = await fetchReportCards(localStorage.getItem("token"));
    setReportCards(data);
  };

  const loadStudents = async () => {
    const data = await fetchStudents(localStorage.getItem("token"));
    setStudents(data);
  };

  const loadClasses = async () => {
    const data = await fetchClasses(localStorage.getItem("token"));
    setClasses(data);
  };

  const loadTeachers = async () => {
    const data = await getTeachers(localStorage.getItem("token"));
    setTeachers(data);
  };

  const handleClassChange = async (class_id) => {
    setReportData({ ...reportData, class_id, subject_id: "" });
    const subjectsData = await fetchSubjects(localStorage.getItem("token"));

    setSubjects(subjectsData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateReportCard(
        editingId,
        reportData,
        localStorage.getItem("token")
      );
    } else {
      await addReportCard(reportData, localStorage.getItem("token"));
    }
    setReportData({
      student_id: "",
      class_id: "",
      subject_id: "",
      teacher_id: "",
      marks_obtained: "",
      total_marks: "",
      grade: "",
    });
    setEditingId(null);
    loadReportCards();
  };

  const handleEdit = (report) => {
    setReportData(report);
    setEditingId(report.id);
  };

  const handleDelete = async (id) => {
    await deleteReportCard(id, localStorage.getItem("token"));
    loadReportCards();
  };

  return (
    <SuperAdminLayout>
      <div className={styles.container}>
        <h2 className={styles.heading}>Manage Report Cards</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <select
            className={styles.input}
            value={reportData.student_id}
            onChange={(e) =>
              setReportData({ ...reportData, student_id: e.target.value })
            }
            required
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>

          <select
            className={styles.input}
            value={reportData.class_id}
            onChange={(e) => handleClassChange(e.target.value)}
            required
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>

          <select
            className={styles.input}
            value={reportData.subject_id}
            onChange={(e) =>
              setReportData({ ...reportData, subject_id: e.target.value })
            }
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>

          <select
            className={styles.input}
            value={reportData.teacher_id}
            onChange={(e) =>
              setReportData({ ...reportData, teacher_id: e.target.value })
            }
            required
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>

          <input
            className={styles.input}
            type="number"
            placeholder="Marks Obtained"
            value={reportData.marks_obtained}
            onChange={(e) =>
              setReportData({ ...reportData, marks_obtained: e.target.value })
            }
            required
          />
          <input
            className={styles.input}
            type="number"
            placeholder="Total Marks"
            value={reportData.total_marks}
            onChange={(e) =>
              setReportData({ ...reportData, total_marks: e.target.value })
            }
            required
          />
          <input
            className={styles.input}
            type="text"
            placeholder="Grade"
            value={reportData.grade}
            onChange={(e) =>
              setReportData({ ...reportData, grade: e.target.value })
            }
            required
          />

          <button className={styles.button} type="submit">
            {editingId ? "Update" : "Add"}
          </button>
        </form>

        <h3 className={styles.subheading}>Report Cards List</h3>
        <ul className={styles.list}>
          {reportCards.map((report) => (
            <li key={report.id} className={styles.listItem}>
              {report.student_id} - {report.class_id} - {report.subject_id} -{" "}
              {report.marks_obtained}/{report.total_marks} - {report.grade}
              <button
                className={styles.editButton}
                onClick={() => handleEdit(report)}
              >
                Edit
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(report.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </SuperAdminLayout>
  );
};

export default ReportCards;
