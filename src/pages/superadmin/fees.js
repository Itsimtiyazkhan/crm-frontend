import { useState, useEffect } from "react";
import {
  fetchFees,
  addFee,
  updateFee,
  deleteFee,
  fetchClasses,
  fetchStudents,
} from "../../service/Api";
import styles from "../../styles/Fee.module.css";
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";

const Fees = () => {
  const [fees, setFees] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [feeData, setFeeData] = useState({
    studentId: "",
    classId: "",
    amount: "",
    dueDate: "",
    status: "Pending",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadFees();
    loadClasses();
    loadStudents();
  }, []);

  const loadFees = async () => {
    const data = await fetchFees(localStorage.getItem("token"));
    setFees(data);
  };

  const loadClasses = async () => {
    const data = await fetchClasses(localStorage.getItem("token"));
    setClasses(data);
  };

  const loadStudents = async () => {
    const data = await fetchStudents(localStorage.getItem("token"));
    setStudents(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateFee(editingId, feeData, localStorage.getItem("token"));
    } else {
      await addFee(feeData, localStorage.getItem("token"));
    }
    resetForm();
    loadFees();
  };

  const handleEdit = (fee) => {
    setFeeData({
      studentId: fee.studentId,
      classId: fee.classId,
      amount: fee.amount,
      dueDate: fee.dueDate,
      status: fee.status,
    });
    setEditingId(fee.id);
  };

  const handleDelete = async (id) => {
    await deleteFee(id, localStorage.getItem("token"));
    loadFees();
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateFee(id, { status: newStatus }, localStorage.getItem("token"));
      loadFees();
    } catch (error) {
      console.error("Error updating fee status:", error);
    }
  };

  const resetForm = () => {
    setFeeData({
      studentId: "",
      classId: "",
      amount: "",
      dueDate: "",
      status: "Pending",
    });
    setEditingId(null);
  };

  return (
    <SuperAdminLayout>
      <div className="container mt-4">
        <h2>Manage Fees</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <select
            value={feeData.studentId}
            onChange={(e) =>
              setFeeData({ ...feeData, studentId: e.target.value })
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
            value={feeData.classId}
            onChange={(e) =>
              setFeeData({ ...feeData, classId: e.target.value })
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

          <input
            type="number"
            placeholder="Amount"
            value={feeData.amount}
            onChange={(e) => setFeeData({ ...feeData, amount: e.target.value })}
            required
          />

          <input
            type="date"
            value={feeData.dueDate}
            onChange={(e) =>
              setFeeData({ ...feeData, dueDate: e.target.value })
            }
            required
          />

          <select
            value={feeData.status}
            onChange={(e) => setFeeData({ ...feeData, status: e.target.value })}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
          </select>

          <button type="submit" className="btn btn-primary">
            {editingId ? "Update Fee" : "Add Fee"}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Cancel Edit
            </button>
          )}
        </form>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Student</th>
              <th>Class</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((fee) => (
              <tr key={fee.id}>
                <td>
                  {students.find((s) => s.id === fee.studentId)?.name ||
                    "Unknown"}
                </td>
                <td>
                  {classes.find((c) => c.id === fee.classId)?.name || "Unknown"}
                </td>
                <td>${fee.amount}</td>
                <td>{fee.dueDate}</td>
                <td>
                  <select
                    value={fee.status}
                    onChange={(e) => handleStatusChange(fee.id, e.target.value)}
                    className="status-dropdown"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEdit(fee)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(fee.id)}
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

export default Fees;
