import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import LearnMore from "../pages/LearnMore.tsx";
import Landing from "../pages/Landing.tsx";
import Posts from "../pages/Posts.tsx";
import Post from "../pages/Post.tsx";
import ErrorBoundary from "@/pages/ErrorBoundary.tsx";
import Login from "@/pages/Login.tsx";
import SignUp from "@/pages/Signup.tsx";

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
        element: <Posts />,
      },
      {
        path: "/posts/:postId",
        element: <Post />,
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
        path: "/test",
        element: <div />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorBoundary />,
  },
]);

export default router;
