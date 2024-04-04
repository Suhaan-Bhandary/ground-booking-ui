import { Link } from "react-router-dom";
import styles from "./AdminNotFound.module.css";

const AdminNotFound = () => {
  return (
    <div className={styles.AdminNotFound}>
      <h1>Page Not Found</h1>
      <p>
        Page you are looking is not available!!, Use the below link to head to
        Admin Page.
      </p>
      <Link to="/" className={styles.adminPageLink}>
        Admin Page
      </Link>
    </div>
  );
};

export default AdminNotFound;
