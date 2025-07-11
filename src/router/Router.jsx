import { createBrowserRouter, Navigate } from "react-router";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";
import Home from "../pages/Home/Home";
import PostsDetails from "../pages/Posts/PostsDetails";
import User from "../UserDashboard/User/User";
import MyProfile from "../UserDashboard/MyProfile/MyProfile";
import AddPosts from "../UserDashboard/AddPosts/AddPosts";
import MyPosts from "../UserDashboard/MyPosts/MyPosts";
import PrivateRoutes from "../routes/PrivateRoutes";



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
    element: <PrivateRoutes>
      <User></User>
    </PrivateRoutes>,
    children: [
      {
        path: "myProfile",
        element: <MyProfile></MyProfile>
      },
      {
        path: "addPosts",
        element: <AddPosts></AddPosts>
      },
      {
        path: "myPosts",
        element: <MyPosts></MyPosts>
      },
    ]

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
