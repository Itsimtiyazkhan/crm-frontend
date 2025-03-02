import { useState, useEffect } from "react";
import styles from "../../styles/Transport.module.css";
import {
  fetchTransports,
  addTransport,
  updateTransport,
  deleteTransport,
} from "../../service/Api";
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";

const Transport = () => {
  const [transports, setTransports] = useState([]);
  const [transportData, setTransportData] = useState({
    route_name: "",
    bus_number: "",
    driver_name: "",
    contact_number: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = "your_jwt_token_here"; // Replace with actual token

  useEffect(() => {
    loadTransports();
  }, []);

  const loadTransports = async () => {
    setLoading(true);
    try {
      const data = await fetchTransports(localStorage.getItem("token"));
      setTransports(data);
    } catch (err) {
      setError("Failed to load transports. Please try again.");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !transportData.route_name ||
      !transportData.bus_number ||
      !transportData.driver_name ||
      !transportData.contact_number
    ) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        await updateTransport(
          editingId,
          transportData,
          localStorage.getItem("token")
        );
      } else {
        await addTransport(transportData, localStorage.getItem("token"));
      }
      setTransportData({
        route_name: "",
        bus_number: "",
        driver_name: "",
        contact_number: "",
      });
      setEditingId(null);
      loadTransports();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const handleEdit = (transport) => {
    setTransportData(transport);
    setEditingId(transport.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    setLoading(true);
    try {
      await deleteTransport(id, localStorage.getItem("token"));
      loadTransports();
    } catch (err) {
      setError("Failed to delete transport.");
    }
    setLoading(false);
  };

  return (
    <SuperAdminLayout>
      <div className={styles.container}>
        <h2 className={styles.heading}>Manage Transport</h2>

        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Route Name"
            value={transportData.route_name}
            onChange={(e) =>
              setTransportData({ ...transportData, route_name: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Bus Number"
            value={transportData.bus_number}
            onChange={(e) =>
              setTransportData({ ...transportData, bus_number: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Driver Name"
            value={transportData.driver_name}
            onChange={(e) =>
              setTransportData({
                ...transportData,
                driver_name: e.target.value,
              })
            }
            required
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={transportData.contact_number}
            onChange={(e) =>
              setTransportData({
                ...transportData,
                contact_number: e.target.value,
              })
            }
            required
          />
          <button type="submit" className={styles.button} disabled={loading}>
            {editingId ? "Update" : "Add"}
          </button>
        </form>

        <h3 className={styles.subheading}>Transport List</h3>
        {loading && <p>Loading...</p>}

        {transports.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Route Name</th>
                <th>Bus Number</th>
                <th>Driver Name</th>
                <th>Contact Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transports.map((transport) => (
                <tr key={transport.id}>
                  <td>{transport.route_name}</td>
                  <td>{transport.bus_number}</td>
                  <td>{transport.driver_name}</td>
                  <td>{transport.contact_number}</td>
                  <td>
                    <button
                      className={styles.editButton}
                      onClick={() => handleEdit(transport)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(transport.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No transport records found.</p>
        )}
      </div>
    </SuperAdminLayout>
  );
};

export default Transport;
