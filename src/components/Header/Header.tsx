import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import Logout from "../Logout/Logout";
import styles from "./Header.module.css";

const Header = () => {
  const userData = useAppSelector((state) => state.userState.user);
  const isLoggedIn = userData ? true : false;

  return (
    <header className={styles.headerWrapper}>
      <div className={`container ${styles.Header}`}>
        <Link to="/">
          <h1 className={styles.title}>Ground Booking</h1>
        </Link>

        <nav>
          <ul className={styles.navLinks}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/profile">{userData?.user_name}</Link>
                </li>
                <li>
                  <Logout>Logout</Logout>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
