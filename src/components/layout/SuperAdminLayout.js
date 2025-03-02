import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./layout.module.css";
import Link from "next/link";

const SuperAdminLayout = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/superadmin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <p>Loading...</p>;
  }

  return (
    <div className={`${styles.dashboard_layout}`}>
      <aside className={`${styles.sidebar}`}>
        <h2>Super Admin Panel</h2>
        <nav className={styles.nav}>
          <ul>
            <li>
              <a href="/superadmin/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/superadmin/schools"> Manage Schools</a>
            </li>
            <li>
              <Link href="/superadmin/teachers">Manage Teachers</Link>
            </li>
            <li>
              <Link href="/superadmin/students">Manage Students</Link>
            </li>
            {/* 
            <li>
              <Link href="/superadmin/progress">Manage Progress</Link>
            </li> */}
            <li>
              <Link href="/superadmin/classes">Manage Classes</Link>
            </li>
            <li>
              <Link href="/superadmin/subjects">Manage Subjects</Link>
            </li>
            <li>
              <Link href="/superadmin/attendance">Manage Attendance</Link>
            </li>
            <li>
              <Link href="/superadmin/assignments">Manage Assignments</Link>
            </li>
            <li>
              <Link href="/superadmin/exams">Manage Exams</Link>
            </li>
            <li>
              <Link href="/superadmin/report-cards">Manage Report-cards</Link>
            </li>
            <li>
              <Link href="/superadmin/fees">Manage Fees</Link>
            </li>
            <li>
              <Link href="/superadmin/Reports">Manage Reports</Link>
            </li>
            <li>
              <Link href="/superadmin/timetables">Manage Timetable</Link>
            </li>
            <li>
              <Link href="/superadmin/library">Manage Library</Link>
            </li>
            <li>
              <Link href="/superadmin/transport">Manage Transport</Link>
            </li>
            <li>
              <a href="/superadmin/login">Logout</a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className={`${styles.content}`}>{children}</main>

      <style jsx>{``}</style>
    </div>
  );
};

export default SuperAdminLayout;
