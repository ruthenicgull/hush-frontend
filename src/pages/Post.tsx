import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BackgroundGradient from "@/components/ui/backgroundGradient";

const post = {
  college: "Institute of Example",
  username: "jargo",
  title: "Unlocking the Power of Silent Moments",
  content:
    "Embracing quiet time can significantly enhance our productivity and overall well-being. Here’s how: ",
};

function Post() {
  const navigate = useNavigate();

  return (
    <div className="pt-24 mx-auto max-w-screen-lg backdrop-blur-3xl">
      <BackgroundGradient />
      <div className="p-4 flex flex-col gap-4 bg-gray-500 bg-opacity-15 rounded-lg">
        <button
          onClick={() => navigate(-1)}
          className="w-fit p-2 border border-gray-400 rounded-full dark:text-white"
        >
          <ArrowLeft />
        </button>
        <h1 className="dark:text-white font-bold text-5xl">{post.title}</h1>
        <div>
          <span className="text-gray-600 dark:text-gray-300 text-sm flex gap-4">
            <span className="dark:text-white">
              {post.college.slice(0, 2).toUpperCase()}
            </span>
            <span>
              <span className="font-medium">{post.college}</span> -{" "}
              <span>{post.username}</span>
            </span>
          </span>
        </div>
        <p className="dark:text-white whitespace-pre-line">{post.content}</p>
      </div>
    </div>
  );
}

export default Post;
