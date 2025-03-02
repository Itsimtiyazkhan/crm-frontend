import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchSuperAdminDashboard, fetchStats } from "../../service/Api";
import SuperAdminLayout from "../../components/layout/SuperAdminLayout";
import { Token } from "@mui/icons-material";

const Dashboard = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ schools: 0, teachers: 0, students: 0 });

  useEffect(() => {
    // Read token and admin data from local storage on the client side
    const token = localStorage.getItem("token");
    const adminData = localStorage.getItem("admin");

    if (!token) {
      router.push("/superadmin/login");
      return; // Exit early if no token
    } else {
      // Parse and set admin data if available
      if (adminData) {
        setAdmin(JSON.parse(adminData));
      }
    }

    // Fetch dashboard data
    fetchSuperAdminDashboard(token)
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          localStorage.removeItem("token");
          router.push("/superadmin/login");
        }
      })
      .catch((error) => {
        console.error("Error fetching dashboard:", error);
      });

    // Fetch stats
    const getStats = async () => {
      try {
        const res = await fetchStats(token);
        setStats(res);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    getStats();
  }, [router]);

  return (
    <SuperAdminLayout>
      <h1>Welcome, {user ? user.email : "Super Admin"}</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card p-3">
            <h3>Schools</h3>
            <p>{stats.schools}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h3>Teachers</h3>
            <p>{stats.teachers}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h3>Students</h3>
            <p>{stats.students}</p>
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
};

export default Dashboard;
