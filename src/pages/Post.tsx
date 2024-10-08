import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import BackgroundGradient from "@/components/ui/backgroundGradient";
import { useEffect, useState } from "react";
import CommentsList from "@/components/blocks/CommentsList";
import axios from "axios";

type Post = {
  title: string;
  college: string;
  username: string;
  content: string;
};

function Post() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null); // Initialize with null
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    async function getPost() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/post/${postId}`
        );
        console.log(response.data.data);

        setPost({
          title: response.data.data.title,
          college: response.data.data.college.name,
          username: response.data.data.owner.username,
          content: response.data.data.content,
        });
      } catch (error) {
        setError("Failed to load post");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getPost();
  }, [postId]);

  function onBackButtonClick() {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Handle case where there's no previous page
      navigate("/");
    }
  }

  if (loading) {
    return <div className="pt-24 mx-auto max-w-screen-lg">Loading...</div>;
  }

  if (error) {
    return <div className="pt-24 mx-auto max-w-screen-lg">{error}</div>;
  }

  if (!post) {
    return <div className="pt-24 mx-auto max-w-screen-lg">No post found.</div>;
  }

  return (
    <div className="pt-24 mx-auto max-w-screen-md backdrop-blur-3xl p-4">
      <BackgroundGradient />
      <div className="p-4 flex flex-col gap-4 bg-gray-500 bg-opacity-15 rounded-lg">
        <button
          onClick={onBackButtonClick}
          className="w-fit p-2 text-gray-500 hover:text-black dark:hover:text-white hover:-translate-x-1 duration-150"
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
        <hr className="bg-gray-500 border-none h-[1px]" />
        <div className="bg-gray-500 bg-opacity-15 py-2 px-4 rounded">
          <CommentsList post_id={postId || null} />
        </div>
      </div>
    </div>
  );
}

export default Post;
