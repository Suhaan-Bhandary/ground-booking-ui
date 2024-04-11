import { useNavigate } from "react-router-dom";
import { tokenActions } from "../../app/features/tokenSlice";
import { userActions } from "../../app/features/userSlice";
import { USER_LOALSTORAGE_KEY } from "../../constants/user";
import { resetLocalStorageData } from "../../helpers/localStorage";
import { useAppDispatch } from "../../hooks/redux";

type LogoutProps = {
  children: React.ReactNode;
  className?: string;
};

const Logout = ({ children, className = "" }: LogoutProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleUseLogout = () => {
    // Reset local storage and redux
    resetLocalStorageData(USER_LOALSTORAGE_KEY);

    dispatch(tokenActions.resetToken());
    dispatch(userActions.setUser(null));

    // Navigating to Home Page
    navigate("/");
  };

  return (
    <button className={className} onClick={handleUseLogout}>
      {children}
    </button>
  );
};

export default Logout;
