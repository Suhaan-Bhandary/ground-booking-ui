import { Route, Routes } from "react-router-dom";
import { ADMIN_ROLE } from "../constants/user";
import useUserLoginStatus from "../hooks/useUserLoginStatus";
import AdminEventSlots from "../pages/Admin/EventSlots/EventSlots";
import AdminEvents from "../pages/Admin/Events/Events";
import Registrations from "../pages/Admin/Registrations/Registrations";
import Users from "../pages/Admin/Users/Users";
import Events from "../pages/Events/Events";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Profile from "../pages/Profile/Profile";
import Slots from "../pages/Slots/Slots";
import UserLogin from "../pages/UserLogin/UserLogin";
import UserRegister from "../pages/UserRegister/UserRegister";
import NotLoggedInRoutes from "./conditionalRoutes/NotLoggedInRoutes";
import UserRoutes from "./conditionalRoutes/UserRoutes";
import AdminLayout from "./layouts/AdminLayout";
import DefaultLayout from "./layouts/DefaultLayout";

const Router = () => {
  const userData = useUserLoginStatus();

  if (userData?.role === ADMIN_ROLE) {
    return (
      // Admin Routes
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index Component={AdminEvents} />
          <Route path="events" Component={AdminEvents} />
          <Route path="events/:eventId/slots" Component={AdminEventSlots} />
          <Route path="registrations" Component={Registrations} />
          <Route path="users" Component={Users} />
        </Route>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route Component={DefaultLayout}>
        {/* Public Routes */}
        <Route index Component={Home} />
        <Route path="/" Component={Home} />
        <Route path="/events" Component={Events} />
        <Route path="/events/:eventId/slots" Component={Slots} />
        <Route path="*" Component={NotFound} />

        {/* Not LoggedIn Routes */}
        <Route element={<NotLoggedInRoutes userData={userData} />}>
          <Route path="/login" Component={UserLogin} />
          <Route path="/register" Component={UserRegister} />
        </Route>

        {/* User Routes */}
        <Route element={<UserRoutes userData={userData} />}>
          <Route path="/profile" Component={Profile} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
