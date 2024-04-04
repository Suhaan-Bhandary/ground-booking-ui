import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.NotFound}>
      <h1>Page Not Found</h1>
      <p>
        Page you are looking is not available!!, Use the below link to head to
        Home Page.
      </p>
      <Link to="/" className={styles.homePageLink}>
        Home Page
      </Link>
    </div>
  );
};

export default NotFound;
