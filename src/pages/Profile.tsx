import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import BackgroundGradient from "@/components/ui/backgroundGradient";
import { useEffect, useState } from "react";
import { PostType, User } from "@/types";
import axios from "axios";
import PostsList from "@/components/blocks/posts/PostsList";

function Profile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null); // Initialize with null
  const [posts, setPosts] = useState<PostType[] | null>(null); // Initialize with empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/user/${userId}`
        );
        console.log(response.data.data);

        setUser({
          _id: response.data.data._id,
          username: response.data.data.username,
          email: response.data.data.email,
          college: response.data.data.college,
        });
      } catch (error: any) {
        setError(error?.response?.data?.message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    async function getUserPosts() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/post/user/${userId}`
        );
        setPosts(
          response.data.data.posts.map((post: any) => ({
            _id: post._id,
            title: post.title,
            college: post.college.name,
            username: post.owner.username,
            content: post.content,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
    getUserPosts();
  }, [userId]);

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

  if (!user) {
    return <div className="pt-24 mx-auto max-w-screen-lg">No user found.</div>;
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
        <h1 className="dark:text-white font-bold text-5xl">{user.username}</h1>
        <div>
          <span className="text-gray-600 dark:text-gray-300 text-sm flex gap-4">
            <span className="dark:text-white">
              {user.college.name.slice(0, 2).toUpperCase()}
            </span>
            <span>
              <span className="font-medium">{user.college.name}</span>
            </span>
          </span>
        </div>
        <hr className="bg-gray-500 border-none h-[1px]" />
        <div>
          <h2 className="dark:text-white text-lg font-semibold text-center">
            Posts
          </h2>
          <div className="flex flex-col gap-4 py-2 px-4 rounded">
            {posts ? <PostsList posts={posts} /> : <p>No posts yets</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
