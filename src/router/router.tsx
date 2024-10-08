import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import LearnMore from "../pages/LearnMore.tsx";
import Landing from "../pages/Landing.tsx";
import Feed from "../pages/Feed.tsx";
import Post from "../pages/Post.tsx";
import ErrorBoundary from "@/pages/ErrorBoundary.tsx";
import Login from "@/pages/Login.tsx";
import SignUp from "@/pages/Signup.tsx";
import Profile from "@/pages/Profile.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/learn-more",
        element: <LearnMore />,
      },
      {
        path: "/posts",
        element: <Feed />,
      },
      {
        path: "/posts/:postId",
        element: <Post />,
      },
      {
        path: "/user/:userId",
        element: <Profile />,
      },
      {
        path: "/test",
        element: <div className=""></div>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <ErrorBoundary />,
  },
]);

export default router;
