import { Link, Outlet } from "react-router-dom";
import { USER_ROLE } from "../../constants/user";
import { IUser } from "../../types/user";
import styles from "./UserRoutes.module.css";

type UserRoutesProps = {
  userData: IUser | null;
};

function UserRoutes({ userData }: UserRoutesProps) {
  if (userData?.role === USER_ROLE) return <Outlet />;

  return (
    <div className={styles.UserRoutes}>
      <div className="container">
        <div>
          <h3>User Login Required!!</h3>
          <p>
            To access this page, please log-in as user using the button below.
            Please note that access requires a valid login. Thank you for using
            our website!
          </p>

          <Link to="/login" className={styles.homePageLink}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserRoutes;
