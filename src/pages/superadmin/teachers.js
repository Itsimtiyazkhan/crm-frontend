import { useEffect, useState } from "react";
import {
  getTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
} from "../../service/Api";
import styles from "../../styles/Teachers.module.css"; // Using CSS Modules
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [teacherForm, setTeacherForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    school_id: "",
  });
  const [editId, setEditId] = useState(null);
  //   const token = localStorage.getItem("token"); // Get token for authentication

  useEffect(() => {
    fetchTeachers();
    getTeachers();
  }, []);

  const fetchTeachers = async () => {
    const data = await getTeachers(localStorage.getItem("token"));
    setTeachers(data);
  };
  const getTeachers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/teachers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching teachers:", errorData);
        return [];
      }

      return response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      return [];
    }
  };

  const handleInputChange = (e) => {
    setTeacherForm({ ...teacherForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateTeacher(editId, teacherForm, localStorage.getItem("token"));
    } else {
      await addTeacher(teacherForm, localStorage.getItem("token"));
    }
    setTeacherForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      school_id: "",
    });
    setEditId(null);
    fetchTeachers();
  };

  const handleEdit = (teacher) => {
    setTeacherForm(teacher);
    setEditId(teacher.id);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this school?")) {
      await deleteTeacher(id, localStorage.getItem("token"));
      fetchTeachers();
    }
  };

  return (
    <SuperAdminLayout>
      <div className={`container ${styles.manageTeachers}`}>
        <h2 className="mt-4 mb-3">Manage Teachers</h2>

        {/* Add / Edit Teacher Form */}
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="row">
            <div className="col-md-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="form-control"
                value={teacherForm.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control"
                value={teacherForm.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className="form-control"
                value={teacherForm.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="form-control"
                value={teacherForm.subject}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-3 mt-2">
              <input
                type="number"
                name="school_id"
                placeholder="School ID"
                className="form-control"
                value={teacherForm.school_id}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-3 mt-2">
              <button type="submit" className="btn btn-primary">
                {editId ? "Update" : "Add"} Teacher
              </button>
            </div>
          </div>
        </form>

        {/* Teachers Table */}
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Subject</th>
              <th>School ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.phone}</td>
                <td>{teacher.subject}</td>
                <td>{teacher.school_id}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(teacher)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(teacher.id)}
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

export default ManageTeachers;
