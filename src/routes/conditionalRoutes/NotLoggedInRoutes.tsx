import { Navigate, Outlet } from "react-router-dom";
import { IUser } from "../../types/user";

type NotLoggedInRoutesProps = {
  userData: IUser | null;
};

function NotLoggedInRoutes({ userData }: NotLoggedInRoutesProps) {
  if (userData === null) return <Outlet />;
  return <Navigate to="/" replace={true} />;
}

export default NotLoggedInRoutes;
