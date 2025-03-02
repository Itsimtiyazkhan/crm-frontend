import { useState, useEffect } from "react";
import {
  fetchAssignments,
  addAssignment,
  updateAssignment,
  deleteAssignment,
  fetchClasses,
  fetchSubjects,
  getTeachers,
} from "../../service/Api";
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";
import styles from "../../styles/Assignments.module.css";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [assignmentData, setAssignmentData] = useState({
    title: "",
    description: "",
    deadline: "",
    classId: "",
    subjectId: "",
    teacherId: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadAssignments();
    loadClasses();
    loadSubjects();
    loadTeachers();
  }, []);

  const loadAssignments = async () => {
    const data = await fetchAssignments(localStorage.getItem("token"));
    setAssignments(data);
  };

  const loadClasses = async () => {
    const data = await fetchClasses(localStorage.getItem("token"));
    setClasses(data);
  };

  const loadSubjects = async () => {
    const data = await fetchSubjects(localStorage.getItem("token"));
    setSubjects(data);
  };

  const loadTeachers = async () => {
    const data = await getTeachers(localStorage.getItem("token"));
    setTeachers(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateAssignment(
        editingId,
        assignmentData,
        localStorage.getItem("token")
      );
    } else {
      await addAssignment(assignmentData, localStorage.getItem("token"));
    }
    setAssignmentData({
      title: "",
      description: "",
      deadline: "",
      classId: "",
      subjectId: "",
      teacherId: "",
    });
    setEditingId(null);
    loadAssignments();
  };

  const handleEdit = (assignment) => {
    setAssignmentData(assignment);
    setEditingId(assignment.id);
  };

  const handleDelete = async (id) => {
    await deleteAssignment(id, localStorage.getItem("token"));
    loadAssignments();
  };

  return (
    <SuperAdminLayout>
      <div className={styles.container}>
        <h2 className={styles.title}>Manage Assignments</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Title"
            value={assignmentData.title}
            onChange={(e) =>
              setAssignmentData({ ...assignmentData, title: e.target.value })
            }
            required
            className={styles.input}
          />
          <textarea
            placeholder="Description"
            value={assignmentData.description}
            onChange={(e) =>
              setAssignmentData({
                ...assignmentData,
                description: e.target.value,
              })
            }
            required
            className={styles.textarea}
          />
          <input
            type="date"
            value={assignmentData.deadline}
            onChange={(e) =>
              setAssignmentData({ ...assignmentData, deadline: e.target.value })
            }
            required
            className={styles.input}
          />
          <select
            value={assignmentData.classId}
            onChange={(e) =>
              setAssignmentData({ ...assignmentData, classId: e.target.value })
            }
            required
            className={styles.select}
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
          <select
            value={assignmentData.subjectId}
            onChange={(e) =>
              setAssignmentData({
                ...assignmentData,
                subjectId: e.target.value,
              })
            }
            required
            className={styles.select}
          >
            <option value="">Select Subject</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
          <select
            value={assignmentData.teacherId}
            onChange={(e) =>
              setAssignmentData({
                ...assignmentData,
                teacherId: e.target.value,
              })
            }
            required
            className={styles.select}
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
          <button type="submit" className={styles.button}>
            {editingId ? "Update Assignment" : "Add Assignment"}
          </button>
        </form>

        <ul className={styles.list}>
          {assignments.map((assignment) => (
            <li key={assignment.id} className={styles.listItem}>
              <div className={styles.assignmentInfo}>
                <h3>{assignment.title}</h3>
                <p>{assignment.description}</p>
                <span className={styles.deadline}>
                  Deadline: {assignment.deadline}
                </span>
              </div>
              <div className={styles.actions}>
                <button
                  onClick={() => handleEdit(assignment)}
                  className={styles.editButton}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(assignment.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SuperAdminLayout>
  );
};

export default Assignments;
