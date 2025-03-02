import { useState, useEffect } from "react";
import {
  fetchReports,
  fetchClasses,
  fetchSubjects,
  fetchStudents,
  addReport,
  updateReport,
  deleteReport,
} from "../../service/Api";
import styles from "../../styles/Report.module.css";
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [reportData, setReportData] = useState({
    studentId: "",
    classId: "",
    subject: "",
    marks: "",
    remarks: "",
    date: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = "your_jwt_token_here"; // Replace with actual token

  useEffect(() => {
    loadReports();
    loadClasses();
    loadSubjects();
    loadStudents();
  }, []);

  const loadReports = async () => {
    setLoading(true);
    const data = await fetchReports(localStorage.getItem("token"));
    setReports(data);
    setLoading(false);
  };

  const loadClasses = async () => {
    const data = await fetchClasses(localStorage.getItem("token"));
    setClasses(data);
  };

  const loadSubjects = async () => {
    const data = await fetchSubjects(localStorage.getItem("token"));
    setSubjects(data);
  };

  const loadStudents = async () => {
    const data = await fetchStudents(localStorage.getItem("token"));
    setStudents(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (editingId) {
      await updateReport(editingId, reportData, localStorage.getItem("token"));
    } else {
      await addReport(reportData, localStorage.getItem("token"));
    }
    setReportData({
      studentId: "",
      classId: "",
      subject: "",
      marks: "",
      remarks: "",
      date: "",
    });
    setEditingId(null);
    loadReports();
  };

  const handleEdit = (report) => {
    setReportData(report);
    setEditingId(report.id);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    await deleteReport(id, localStorage.getItem("token"));
    loadReports();
  };

  return (
    <SuperAdminLayout>
      <div className={styles.container}>
        <h2>Manage Student Reports</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <select
            value={reportData.studentId}
            onChange={(e) =>
              setReportData({ ...reportData, studentId: e.target.value })
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
            value={reportData.classId}
            onChange={(e) =>
              setReportData({ ...reportData, classId: e.target.value })
            }
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
            value={reportData.subject}
            onChange={(e) =>
              setReportData({ ...reportData, subject: e.target.value })
            }
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((subj) => (
              <option key={subj.id} value={subj.name}>
                {subj.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Marks"
            value={reportData.marks}
            onChange={(e) =>
              setReportData({ ...reportData, marks: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Remarks"
            value={reportData.remarks}
            onChange={(e) =>
              setReportData({ ...reportData, remarks: e.target.value })
            }
          />

          <input
            type="date"
            value={reportData.date}
            onChange={(e) =>
              setReportData({ ...reportData, date: e.target.value })
            }
            required
          />

          <button type="submit" className={styles.button} disabled={loading}>
            {editingId ? "Update" : "Add"}
          </button>
        </form>

        {loading && <p className={styles.loading}>Loading...</p>}

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Subject</th>
                <th>Marks</th>
                <th>Remarks</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>
                    {students.find((s) => s.id === report.studentId)?.name ||
                      "Unknown"}
                  </td>
                  <td>
                    {classes.find((c) => c.id === report.classId)?.name ||
                      "Unknown"}
                  </td>
                  <td>{report.subject}</td>
                  <td>{report.marks}</td>
                  <td>{report.remarks}</td>
                  <td>{report.date}</td>
                  <td>
                    <button
                      className={styles.editBtn}
                      onClick={() => handleEdit(report)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(report.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SuperAdminLayout>
  );
};

export default Reports;
