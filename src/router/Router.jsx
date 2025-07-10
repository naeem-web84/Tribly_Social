import { createBrowserRouter, Navigate } from "react-router";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";
import Home from "../pages/Home/Home";
import PostsDetails from "../pages/Posts/PostsDetails"; 



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
      {
        path: "/post/:id",
        element: <PostsDetails></PostsDetails>
      },
    ],
  },

  {
    path: "/user",

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
