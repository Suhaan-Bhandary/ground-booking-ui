import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import Logout from "../Logout/Logout";
import styles from "./Header.module.css";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const userData = useAppSelector((state) => state.userState.user);
  const isLoggedIn = userData ? true : false;

  const toggleNav = () => {
    setIsNavOpen((state) => !state);
  };

  return (
    <>
      <header className={styles.headerWrapper}>
        <div className={`container ${styles.Header}`}>
          <Link to="/">
            <h1 className={styles.title}>Ground Booking</h1>
          </Link>

          <button
            type="button"
            onClick={toggleNav}
            className={styles.mobileNavToggle}
            aria-controls="primary-navigation"
          >
            {!isNavOpen ? <RxHamburgerMenu /> : <MdOutlineClose />}
            <span className="visually-hidden">Menu</span>
          </button>

          <nav className={`${styles.nav} ${isNavOpen ? styles.navOpen : ""}`}>
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
                    <Logout className={styles.button}>Logout</Logout>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className={styles.button}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className={styles.button}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* Div is used to provide backdrop shadow */}
      <div
        className={`${styles.backdrop} ${isNavOpen ? styles.backdropOpen : ""}`}
      >
        {" "}
      </div>
    </>
  );
};

export default Header;
