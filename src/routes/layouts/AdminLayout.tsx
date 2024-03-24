import { Outlet } from "react-router-dom";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import styles from "./AdminLayout.module.css";

function AdminLayout() {
  return (
    <div className={styles.Dashboard}>
      <AdminSideBar />
      <div className={styles.dashboardWrapper}>
        <div className={styles.dashboardMainContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
