import { Route, Routes } from "react-router-dom";
import { ADMIN_ROLE, USER_ROLE } from "../constants/user";
import useUserLoginStatus from "../hooks/useUserLoginStatus";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import UserLogin from "../pages/UserLogin/UserLogin";
import UserRegister from "../pages/UserRegister/UserRegister";
import AuthRouteLayout from "./AuthRouteLayout";
import DefaultLayout from "./DefaultLayout";

const Router = () => {
  const userData = useUserLoginStatus();

  return (
    <Routes>
      <Route Component={DefaultLayout}>
        {/* Public Routes */}
        <Route index Component={Home} />
        <Route path="/" Component={Home} />
        <Route path="/login" Component={UserLogin} />
        <Route path="/register" Component={UserRegister} />

        {/* User Routes */}
        <Route
          element={
            <AuthRouteLayout roleRequired={USER_ROLE} userData={userData} />
          }
        >
          <Route path="/user" Component={Home} />
        </Route>

        {/* Admin Routes */}
        <Route
          element={
            <AuthRouteLayout roleRequired={ADMIN_ROLE} userData={userData} />
          }
        >
          <Route path="/admin" Component={Home} />
        </Route>

        <Route path="*" Component={NotFound} />
      </Route>
    </Routes>
  );
};

export default Router;
