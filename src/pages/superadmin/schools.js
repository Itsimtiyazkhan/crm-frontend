import { useState, useEffect } from "react";
import {
  fetchSchools,
  addSchool,
  updateSchool,
  deleteSchool,
} from "../../service/Api";
import styles from "../../styles/Schools.module.css";
import SuperAdminLayout from "../../components/layout/SuperAdminLayout";

export default function Schools() {
  const [schools, setSchools] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    email: "",
    phone: "",
  });
  const [editId, setEditId] = useState(null);
  const [token, setToken] = useState(""); // Assume token is stored in localStorage

  useEffect(() => {
    setToken(localStorage.getItem("token")); // Load token
    loadSchools();
  }, []);

  const loadSchools = async () => {
    const imt = localStorage.getItem("token");
    const data = await fetchSchools(imt);
    setSchools(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        console.log("Updating school:", editId, formData); // Debugging
        await updateSchool(editId, formData, token);
      } else {
        console.log("Adding new school:", formData); // Debugging
        await addSchool(formData, token);
      }

      setFormData({ name: "", city: "", email: "", phone: "" });
      setEditId(null);
      loadSchools();
    } catch (error) {
      console.error("Error updating school:", error); // Log the error
    }
  };

  const handleEdit = (school) => {
    setFormData(school);
    setEditId(school.id);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this school?")) {
      try {
        const res = await deleteSchool(id, localStorage.getItem("token"));
        alert(res.message);

        setSchools((prevSchools) =>
          prevSchools.data.filter((school) => school.id !== id)
        );
        loadSchools();
      } catch (error) {
        console.error("Error deleting school:", error);
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <SuperAdminLayout>
      <div className={styles.container}>
        <h2>Manage Schools</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="School Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />
          <button type="submit">
            {editId ? "Update School" : "Add School"}
          </button>
        </form>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schools.data?.map((school) => (
              <tr key={school.id}>
                <td>{school.name}</td>
                <td>{school.city}</td>
                <td>{school.email}</td>
                <td>{school.phone}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEdit(school)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(school.id)}
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
}
