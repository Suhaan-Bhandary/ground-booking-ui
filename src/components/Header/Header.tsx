import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import Logout from "../Logout/Logout";

const Header = () => {
  const userData = useAppSelector((state) => state.userState.user);
  const isLoggedIn = userData ? true : false;

  return (
    <header>
      <div>
        <h1>Ground Booking</h1>
      </div>
      <nav>
        <ul>
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
    </header>
  );
};

export default Header;
