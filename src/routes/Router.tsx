import { Route, Routes } from "react-router-dom";
import useUserLoginStatus from "../hooks/useUserLoginStatus";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import AdminEventSlots from "../pages/Admin/EventSlots/EventSlots";
import AdminEvents from "../pages/Admin/Events/Events";
import Registerations from "../pages/Admin/Registerations/Registerations";
import UserRegisterations from "../pages/Admin/UserRegisterations/UserRegisterations";
import Users from "../pages/Admin/Users/Users";
import Events from "../pages/Events/Events";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Profile from "../pages/Profile/Profile";
import Slots from "../pages/Slots/Slots";
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
        <Route element={<UserRoutes userData={userData} />}>
          <Route path="/events" Component={Events} />
          <Route path="/events/:eventId/slots" Component={Slots} />
          <Route path="/profile" Component={Profile} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoutes userData={userData} />}>
        <Route path="" Component={Dashboard} />
        <Route path="events" Component={AdminEvents} />
        <Route path="events/:eventId/slots" Component={AdminEventSlots} />
        <Route path="registerations" Component={Registerations} />
        <Route path="users" Component={Users} />
        <Route
          path="users/:userId/registerations"
          Component={UserRegisterations}
        />
      </Route>
    </Routes>
  );
};

export default Router;
