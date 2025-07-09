import { createBrowserRouter, Navigate } from "react-router";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";
import Home from "../pages/Home/Home";
import UserDashboardLayout from "../Layouts/UserDashboardLayout/UserDashboardLayout";
import MyProfile from "../pages/UserDashboard/MyProfile/MyProfile";
import AddPost from "../pages/UserDashboard/AddPost/AddPost";
import MyPosts from "../pages/UserDashboard/MyPosts/MyPosts";
import PrivateRoutes from "../routes/PrivateRoutes";



// Admin Dashboard imports
// import AdminDashboardLayout from "../Layouts/AdminDashboardLayout/AdminDashboardLayout";
// import AdminProfile from "../pages/AdminDashboard/AdminProfile";
// import ManageUsers from "../pages/AdminDashboard/ManageUsers";
// import ReportedComments from "../pages/AdminDashboard/ReportedComments";
// import MakeAnnouncement from "../pages/AdminDashboard/MakeAnnouncement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  {
    path: "/dashboard/user",
    element: <PrivateRoutes>
      <UserDashboardLayout></UserDashboardLayout>
    </PrivateRoutes>,
    children: [
      {
        index: true,
        element: <MyProfile />,
      },
      {
        path: "add-post",
        element: <AddPost />,
      },
      {
        path: "my-posts",
        element: <MyPosts />,
      },
    ],
  },

  // {
  //   path: "/admin",
  //   element: <AdminDashboardLayout />,
  //   children: [
  //     {
  //       index: true,
  //       element: <AdminProfile />,
  //     },
  //     {
  //       path: "admin-profile",
  //       element: <AdminProfile />,
  //     },
  //     {
  //       path: "manage-users",
  //       element: <ManageUsers />,
  //     },
  //     {
  //       path: "reported-comments",
  //       element: <ReportedComments />,
  //     },
  //     {
  //       path: "make-announcement",
  //       element: <MakeAnnouncement />,
  //     },
  //   ],
  // },
]);
