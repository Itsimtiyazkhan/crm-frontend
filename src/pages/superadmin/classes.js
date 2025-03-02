// Classes.js
import { useState, useEffect } from "react";
import {
  fetchClasses,
  addClass,
  updateClass,
  deleteClass,
} from "../../service/Api";
import styles from "../../styles/Classes.module.css";
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [classData, setClassData] = useState({ name: "", section: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    const data = await fetchClasses(localStorage.getItem("token"));
    setClasses(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateClass(editingId, classData, localStorage.getItem("token"));
    } else {
      await addClass(classData, localStorage.getItem("token"));
    }
    setClassData({ name: "", section: "" });
    setEditingId(null);
    loadClasses();
  };

  const handleEdit = (classItem) => {
    setClassData(classItem);
    setEditingId(classItem.id);
  };

  const handleDelete = async (id) => {
    await deleteClass(id, localStorage.getItem("token"));
    loadClasses();
  };

  return (
    <SuperAdminLayout>
      <div className={styles.container}>
        <h2 className={styles.title}>Manage Classes</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Class Name"
            value={classData.name}
            onChange={(e) =>
              setClassData({ ...classData, name: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Section"
            value={classData.section}
            onChange={(e) =>
              setClassData({ ...classData, section: e.target.value })
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
              <th>Class Name</th>
              <th>Section</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes?.map((classItem) => (
              <tr key={classItem.id}>
                <td>{classItem.name}</td>
                <td>{classItem.section}</td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit(classItem)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(classItem.id)}
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

export default Classes;
