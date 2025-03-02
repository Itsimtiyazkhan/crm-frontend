import { useState } from "react";
import { useRouter } from "next/router";
import { addSchool } from "../../service/Api";
import SuperAdminLayout from "../../components/layout/SuperAdminLayout";
import styles from "../../styles/Schools.module.css"; // CSS Module

const AddSchool = () => {
  const [school, setSchool] = useState({
    name: "",
    city: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setSchool({ ...school, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/superadmin/login");
      return;
    }

    const response = await addSchool(school, token);
    if (response.success) {
      router.push("/superadmin/schools");
    } else {
      setError(response.message);
    }
  };

  return (
    <SuperAdminLayout>
      <div className={styles.container}>
        <h2>Add New School</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">School Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={school.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={school.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={school.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={school.phone}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add School
          </button>
        </form>
      </div>
    </SuperAdminLayout>
  );
};

export default AddSchool;
