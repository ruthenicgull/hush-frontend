import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import LearnMore from "../pages/LearnMore.tsx";
import Landing from "../pages/Landing.tsx";
import { Home } from "lucide-react";
import Posts from "../pages/Posts.tsx";
import Post from "../pages/Post.tsx";

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
        path: "/home",
        element: <Home />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/posts/:postId",
        element: <Post />,
      },
    ],
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

export default router;
