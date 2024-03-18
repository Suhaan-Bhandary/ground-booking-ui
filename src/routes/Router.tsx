import { Route, Routes } from "react-router-dom";
import useUserLoginStatus from "../hooks/useUserLoginStatus";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import UserLogin from "../pages/UserLogin/UserLogin";
import UserRegister from "../pages/UserRegister/UserRegister";
import AdminRoutes from "./conditionalRoutes/AdminRoutes";
import NotLoggedInRoutes from "./conditionalRoutes/NotLoggedInRoutes";
import UserRoutes from "./conditionalRoutes/UserRoutes";
import DefaultLayout from "./layouts/DefaultLayout";

const Router = () => {
  const userData = useUserLoginStatus();

  return (
    <Routes>
      <Route Component={DefaultLayout}>
        {/* Public Routes */}
        <Route index Component={Home} />
        <Route path="/" Component={Home} />
        <Route path="*" Component={NotFound} />

        {/* Not LoggedIn Routes */}
        <Route element={<NotLoggedInRoutes userData={userData} />}>
          <Route path="/login" Component={UserLogin} />
          <Route path="/register" Component={UserRegister} />
        </Route>

        {/* User Routes */}
        <Route path="/user" element={<UserRoutes userData={userData} />}>
          <Route path="" Component={Home} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoutes userData={userData} />}>
        <Route path="" Component={Home} />
      </Route>
    </Routes>
  );
};

export default Router;
