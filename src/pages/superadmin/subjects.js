import { useState, useEffect } from "react";
import {
  fetchSubjects,
  addSubject,
  updateSubject,
  deleteSubject,
} from "../../service/Api";
import styles from "../../styles/Subjects.module.css";
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [subjectData, setSubjectData] = useState({ name: "", code: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    const data = await fetchSubjects(localStorage.getItem("token"));
    setSubjects(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateSubject(
        editingId,
        subjectData,
        localStorage.getItem("token")
      );
    } else {
      await addSubject(subjectData, localStorage.getItem("token"));
    }
    setSubjectData({ name: "", code: "" });
    setEditingId(null);
    loadSubjects();
  };

  const handleEdit = (subject) => {
    setSubjectData(subject);
    setEditingId(subject.id);
  };

  const handleDelete = async (id) => {
    await deleteSubject(id, localStorage.getItem("token"));
    loadSubjects();
  };

  return (
    <SuperAdminLayout>
      <div className={styles.container}>
        <h2>Manage Subjects</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Subject Name"
            value={subjectData.name}
            onChange={(e) =>
              setSubjectData({ ...subjectData, name: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Subject Code"
            value={subjectData.code}
            onChange={(e) =>
              setSubjectData({ ...subjectData, code: e.target.value })
            }
            required
          />
          <button type="submit" className={styles.button}>
            {editingId ? "Update" : "Add"}
          </button>
        </form>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject.id}>
                <td>{subject.id}</td>
                <td>{subject.name}</td>
                <td>{subject.code}</td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit(subject)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(subject.id)}
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

export default Subjects;
