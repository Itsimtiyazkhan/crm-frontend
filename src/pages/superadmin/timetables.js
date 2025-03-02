import { useState, useEffect } from "react";
import {
  fetchTimetables,
  addTimetable,
  updateTimetable,
  deleteTimetable,
  fetchClasses,
  fetchSubjects,
  getTeachers,
} from "../../service/Api";

import styles from "../../styles/Timetables.module.css";
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";

const Timetables = () => {
  const [timetables, setTimetables] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [timetableData, setTimetableData] = useState({
    classId: "",
    subject: "",
    teacherId: "",
    day: "",
    startTime: "",
    endTime: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [timetablesData, classesData, subjectsData, teachersData] =
      await Promise.all([
        fetchTimetables(localStorage.getItem("token")),
        fetchClasses(localStorage.getItem("token")),
        fetchSubjects(localStorage.getItem("token")),
        getTeachers(localStorage.getItem("token")),
      ]);
    setTimetables(timetablesData);
    setClasses(classesData);
    setSubjects(subjectsData);
    setTeachers(teachersData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateTimetable(
        editingId,
        timetableData,
        localStorage.getItem("token")
      );
    } else {
      await addTimetable(timetableData, localStorage.getItem("token"));
    }
    setTimetableData({
      classId: "",
      subject: "",
      teacherId: "",
      day: "",
      startTime: "",
      endTime: "",
    });
    setEditingId(null);
    loadData();
  };

  const handleEdit = (timetable) => {
    setTimetableData(timetable);
    setEditingId(timetable.id);
  };

  const handleDelete = async (id) => {
    await deleteTimetable(id, localStorage.getItem("token"));
    loadData();
  };

  return (
    <SuperAdminLayout>
      <div className={styles.container}>
        <h2>Manage Timetables</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <select
            value={timetableData.classId}
            onChange={(e) =>
              setTimetableData({ ...timetableData, classId: e.target.value })
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
            value={timetableData.subject}
            onChange={(e) =>
              setTimetableData({ ...timetableData, subject: e.target.value })
            }
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.name}>
                {sub.name}
              </option>
            ))}
          </select>

          <select
            value={timetableData.teacherId}
            onChange={(e) =>
              setTimetableData({ ...timetableData, teacherId: e.target.value })
            }
            required
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Day"
            value={timetableData.day}
            onChange={(e) =>
              setTimetableData({ ...timetableData, day: e.target.value })
            }
            required
          />

          <input
            type="time"
            placeholder="Start Time"
            value={timetableData.startTime}
            onChange={(e) =>
              setTimetableData({ ...timetableData, startTime: e.target.value })
            }
            required
          />

          <input
            type="time"
            placeholder="End Time"
            value={timetableData.endTime}
            onChange={(e) =>
              setTimetableData({ ...timetableData, endTime: e.target.value })
            }
            required
          />

          <button type="submit">{editingId ? "Update" : "Add"}</button>
        </form>

        <ul className={styles.list}>
          {timetables.map((timetable) => (
            <li key={timetable.id} className={styles.listItem}>
              <span>
                {timetable.classId} - {timetable.subject} ({timetable.day})
              </span>
              <div>
                <button
                  className={styles.edit}
                  onClick={() => handleEdit(timetable)}
                >
                  Edit
                </button>
                <button
                  className={styles.delete}
                  onClick={() => handleDelete(timetable.id)}
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

export default Timetables;
