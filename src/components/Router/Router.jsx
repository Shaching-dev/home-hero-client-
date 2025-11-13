import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Home/Home";
import Services from "../pages/Services";
import AddServices from "../pages/AddServices";
import MyBookings from "../pages/MyBookings";
import Profile from "../Auth/Profile";
import Login from "../Auth/Login";
import Registration from "../Auth/Registration";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AllServiceDetails from "../PrivatePages/AllServiceDetails";
import MyServices from "../pages/MyServices";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/services",
        Component: Services,
      },

      {
        path: "/allServiceDetails/:id",
        element: (
          <PrivateRoute>
            <AllServiceDetails></AllServiceDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://hero-home-server-three.vercel.app/services/${params.id}`
          ),
      },
      {
        path: "/addServices",
        element: (
          <PrivateRoute>
            <AddServices />
          </PrivateRoute>
        ),
      },
      {
        path: "/myServices",
        element: (
          <PrivateRoute>
            <MyServices />
          </PrivateRoute>
        ),
      },
      {
        path: "/myBookings",
        element: (
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Registration,
      },
    ],
  },
]);

export { router };
