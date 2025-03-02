import { useState, useEffect } from "react";
import {
  fetchStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  fetchClasses,
} from "../../service/Api";
import styles from "../../styles/Students.module.css";
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    class_name: "",
    section: "",
    school_id: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadStudents();
    loadClasses();
  }, []);

  const loadStudents = async () => {
    const data = await fetchStudents(localStorage.getItem("token"));
    setStudents(data);
  };

  const loadClasses = async () => {
    const data = await fetchClasses(localStorage.getItem("token"));
    setClasses(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateStudent(editingId, student, localStorage.getItem("token"));
    } else {
      await addStudent(student, localStorage.getItem("token"));
    }
    setStudent({
      name: "",
      email: "",
      phone: "",
      class_name: "",
      section: "",
      school_id: "",
    });
    setEditingId(null);
    loadStudents();
  };

  const handleEdit = (stu) => {
    setStudent(stu);
    setEditingId(stu.id);
  };

  const handleDelete = async (id) => {
    await deleteStudent(id, localStorage.getItem("token"));
    loadStudents();
  };

  return (
    <SuperAdminLayout>
      <div className="container mt-4">
        <h2>Manage Students</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={student.name}
            onChange={(e) => setStudent({ ...student, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={student.email}
            onChange={(e) => setStudent({ ...student, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={student.phone}
            onChange={(e) => setStudent({ ...student, phone: e.target.value })}
            required
          />

          {/* Class Selection */}
          <select
            value={student.class_name}
            onChange={(e) =>
              setStudent({
                ...student,
                class_name: e.target.value,
                section: "",
              })
            }
            required
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.name}>
                {cls.name}
              </option>
            ))}
          </select>

          {/* Section Selection */}

          <select
            value={student.section}
            onChange={(e) =>
              setStudent({ ...student, section: e.target.value })
            }
            required
            disabled={!student.class_name}
          >
            <option value="">Select Section</option>
            {console.log(
              classes.find((cls) => cls.name === student.class_name), // Correct condition
              "Class Debug"
            )}
            {classes
              .find((cls) => cls.name === student.class_name) // Find class using class_name
              ?.section?.split(",") // Assuming sections are stored as a comma-separated string
              .map((sec) => (
                <option key={sec.trim()} value={sec.trim()}>
                  {sec.trim().toUpperCase()}
                </option>
              ))}
          </select>

          <input
            type="number"
            placeholder="School ID"
            value={student.school_id}
            onChange={(e) =>
              setStudent({ ...student, school_id: e.target.value })
            }
            required
          />
          <button type="submit" className="btn btn-primary">
            {editingId ? "Update" : "Add"}
          </button>
        </form>

        <table className="table table-bordered mt-4">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Class</th>
              <th>Section</th>
              <th>School ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu) => (
              <tr key={stu.id}>
                <td>{stu.name}</td>
                <td>{stu.email}</td>
                <td>{stu.phone}</td>
                <td>
                  {classes.find((cls) => cls.name === stu.class_name)?.name}
                </td>

                <td>{stu.section}</td>
                <td>{stu.school_id}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm mx-1"
                    onClick={() => handleEdit(stu)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm mx-1"
                    onClick={() => handleDelete(stu.id)}
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

export default Students;
