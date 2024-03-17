import { Link, Outlet } from "react-router-dom";
import { ADMIN_ROLE } from "../../constants/user";
import { IUser } from "../../types/user";

type AdminRoutesProps = {
  userData: IUser | null;
};

function AdminRoutes({ userData }: AdminRoutesProps) {
  if (userData?.role === ADMIN_ROLE) return <Outlet />;

  return (
    <div>
      <div className="container">
        <div>
          <h3>Admin Login Required!!</h3>
          <p>
            To access this page, please log-in as admin using the button below.
            Please note that access requires a valid login. Thank you for using
            our website!
          </p>

          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default AdminRoutes;
