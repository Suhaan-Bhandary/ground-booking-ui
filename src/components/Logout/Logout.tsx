import { useNavigate } from "react-router-dom";
import { USER_LOALSTORAGE_KEY } from "../../constants/user";
import { resetLocalStorageData } from "../../helpers/localStorage";
import { userActions } from "../../app/features/userSlice";
import { useAppDispatch } from "../../hooks/redux";

type LogoutProps = {
  children: React.ReactNode;
};

const Logout = ({ children }: LogoutProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleUseLogout = () => {
    // Reset local storage and redux
    resetLocalStorageData(USER_LOALSTORAGE_KEY);
    dispatch(userActions.setUser(null));

    // Navigating to Home Page
    navigate("/");
  };

  return <button onClick={handleUseLogout}>{children}</button>;
};

export default Logout;
