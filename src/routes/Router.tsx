import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import DefaultLayout from "./DefaultLayout";

const Router = () => {
  return (
    <Routes>
      <Route Component={DefaultLayout}>
        <Route index Component={Home} />
        <Route path="/" Component={Home} />
        <Route path="*" Component={NotFound} />
      </Route>
    </Routes>
  );
};

export default Router;
