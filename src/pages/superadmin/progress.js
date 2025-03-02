import { useState, useEffect } from "react";
import { fetchStudentProgress } from "../../service/Api";
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";

const StudentProgress = () => {
  const [progress, setProgress] = useState(null);
  const studentId = "1"; // Replace with actual student ID

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    const data = await fetchStudentProgress(
      studentId,
      localStorage.getItem("token")
    );
    setProgress(data);
  };

  return (
    <SuperAdminLayout>
      <div>
        <h2>Student Progress</h2>
        {progress ? (
          <div>
            <p>
              <strong>Name:</strong> {progress.name || "N/A"}
            </p>
            <p>
              <strong>Class:</strong> {progress.class_id || "N/A"}
            </p>
            <p>
              <strong>Attendance:</strong>{" "}
              {progress.attendance_percentage !== null
                ? `${progress.attendance_percentage.toFixed(2)}%`
                : "No data"}
            </p>
            <p>
              <strong>Average Marks:</strong>{" "}
              {progress.avg_marks !== null ? progress.avg_marks : "No data"}
            </p>
            <p>
              <strong>Total Assignments:</strong>{" "}
              {progress.total_assignments || 0}
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </SuperAdminLayout>
  );
};

export default StudentProgress;
