import { createBrowserRouter, Navigate } from "react-router"; // <-- changed here
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
import WelcomeUser from "../UserDashboard/WelcomeUser/WelcomeUser";
import UserUpdate from "../UserDashboard/User/UserUpdate";
import CommentsPage from "../UserDashboard/CommentsPage/CommentsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        index: true,
        element: <Home />,
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
        path: "/posts/:id", // <-- fixed here: "posts" plural, NOT "post"
        element: (
          <PrivateRoutes>
            <PostsDetails />
          </PrivateRoutes>
        ),
      },
    ],
  },

  {
    path: "/user",
    element: (
      <PrivateRoutes>
        <User />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "/user",
        element: <WelcomeUser />,
      },
      {
        path: "updateProfile",
        element: <UserUpdate />,
      },
      {
        path: "myProfile",
        element: <MyProfile />,
      },
      {
        path: "comments/:postId",
        element: <CommentsPage />,
      },
      {
        path: "addPosts",
        element: <AddPosts />,
      },
      {
        path: "myPosts",
        element: <MyPosts />,
      },
    ],
  },
]);
