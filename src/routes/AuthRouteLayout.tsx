import { Link, Outlet } from "react-router-dom";
import { TUser, TUserRole } from "../types/user";

export interface IAuthRouteLayout {
  roleRequired: TUserRole;
  userData: TUser;
}

function AuthRouteLayout({ roleRequired, userData }: IAuthRouteLayout) {
  if (roleRequired === userData?.role) return <Outlet />;

  return (
    <div>
      <div className="container">
        <div>
          <h3>Login Required!!</h3>
          <p>
            To access this page, please log in using the button below. Please
            note that access requires a valid login. Thank you for using our
            website!
          </p>

          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default AuthRouteLayout;
