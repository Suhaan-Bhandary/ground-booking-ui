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
          <li>Home</li>
          {isLoggedIn ? <p>{userData?.user_name}</p> : null}
          {isLoggedIn ? <Logout>Logout</Logout> : null}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
