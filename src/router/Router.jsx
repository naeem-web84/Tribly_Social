import { createBrowserRouter } from "react-router";
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
import AdminLayouts from "../AdminDashboard/AdminLayouts/AdminLayouts";
import AdminProfile from "../AdminDashboard/AdminProfile/AdminProfile";
import ManageUser from "../AdminDashboard/ManageUser/ManageUser";
import MakeAnnouncement from "../AdminDashboard/MakeAnnouncement/MakeAnnouncement";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import ManageActivitis from "../AdminDashboard/Activitis/ManageActivitis";
import MemberShip from "../pages/MemberShip/MemberShip";
import AdminRoutes from "../routes/AdminRoutes/AdminRoutes";
import AddTags from "../AdminDashboard/AddTags/AddTags";
import TriblyUserGuide from "../components/TriblyUserGuide/TriblyUserGuide";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "userGuide",
        element: <TriblyUserGuide></TriblyUserGuide>
      },
      {
        path: "membership/:id",
        element: <PrivateRoutes>
          <MemberShip></MemberShip>
        </PrivateRoutes>
      },
      {
        path: "posts/:id",
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
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,

        element: <WelcomeUser />
      },
      {
        path: "updateProfile",

        element: <UserUpdate />
      },
      {
        path: "myProfile",

        element: <MyProfile />
      },
      {
        path: "comments/:postId",

        element: <CommentsPage />
      },
      {
        path: "addPosts",

        element: <AddPosts />
      },
      {
        path: "myPosts",
        element: <MyPosts />
      },
    ],
  },
  {
    path: "/admin",  
    element: (
      <PrivateRoutes>
        <AdminRoutes>
          <AdminLayouts />
        </AdminRoutes>
      </PrivateRoutes>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AdminProfile />
      },
      {
        path: "manageUser",
        element: <ManageUser />
      },
      {
        path: "tags",
        element: <AddTags></AddTags>
      },
      {
        path: "makeAnnouncement",
        element: <MakeAnnouncement />
      },
      {
        path: "manageActivitis",
        element: <ManageActivitis></ManageActivitis>
      },
    ],
  },
  {
    path: "*",  
    element: <ErrorPage />,
  },
]);
