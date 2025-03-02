import { useState, useEffect } from "react";
import {
  fetchClasses,
  fetchSubjects,
  fetchExams,
  addExam,
  updateExam,
  deleteExam,
} from "../../service/Api";
import styles from "../../styles/Exams.module.css";
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [examData, setExamData] = useState({
    classId: "",
    subjectId: "",
    date: "",
    time: "",
    duration: "",
    maxMarks: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const classData = await fetchClasses(localStorage.getItem("token"));
    const subjectData = await fetchSubjects(localStorage.getItem("token"));
    const examData = await fetchExams(localStorage.getItem("token"));

    setClasses(classData);
    setSubjects(subjectData);
    setExams(examData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateExam(editingId, examData, localStorage.getItem("token"));
    } else {
      await addExam(examData, localStorage.getItem("token"));
    }
    resetForm();
    loadData();
  };

  const handleEdit = (exam) => {
    setExamData(exam);
    setEditingId(exam.id);
  };

  const handleDelete = async (id) => {
    await deleteExam(id, localStorage.getItem("token"));
    loadData();
  };

  const resetForm = () => {
    setExamData({
      classId: "",
      subjectId: "",
      date: "",
      time: "",
      duration: "",
      maxMarks: "",
    });
    setEditingId(null);
  };

  return (
    <SuperAdminLayout>
      <div className="container mt-4">
        <h2>Manage Exams</h2>

        {/* Exam Form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <select
            value={examData.classId}
            onChange={(e) =>
              setExamData({ ...examData, classId: e.target.value })
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
            value={examData.subjectId}
            onChange={(e) =>
              setExamData({ ...examData, subjectId: e.target.value })
            }
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={examData.date}
            onChange={(e) => setExamData({ ...examData, date: e.target.value })}
            required
          />
          <input
            type="time"
            value={examData.time}
            onChange={(e) => setExamData({ ...examData, time: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Duration (minutes)"
            value={examData.duration}
            onChange={(e) =>
              setExamData({ ...examData, duration: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Max Marks"
            value={examData.maxMarks}
            onChange={(e) =>
              setExamData({ ...examData, maxMarks: e.target.value })
            }
            required
          />

          <button type="submit" className="btn btn-primary">
            {editingId ? "Update Exam" : "Add Exam"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          )}
        </form>

        {/* Exam List */}
        <h3 className="mt-4">Exam List</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Class</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Time</th>
              <th>Duration</th>
              <th>Max Marks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id}>
                <td>
                  {classes.find((cls) => cls.id === exam.classId)?.name ||
                    "Unknown"}
                </td>
                <td>
                  {subjects.find((sub) => sub.id === exam.subjectId)?.name ||
                    "Unknown"}
                </td>
                <td>{exam.date}</td>
                <td>{exam.time}</td>
                <td>{exam.duration} min</td>
                <td>{exam.maxMarks}</td>
                <td>
                  <button
                    onClick={() => handleEdit(exam)}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exam.id)}
                    className="btn btn-danger btn-sm ms-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SuperAdminLayout>
  );
};

export default Exams;
