import PostCard from "@/components/blocks/PostCard";
import BackgroundGradient from "@/components/ui/backgroundGradient";
import { useEffect, useState } from "react";
import { Loader } from "@/components/ui/Loader";
import axios from "@/api/axios";

type Post = {
  _id: string;
  college: {
    name: string;
  };
  owner: {
    username: string;
  };
  title: string;
  content: string;
  votes: number;
};

function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetching posts from an API using axios
  useEffect(() => {
    async function getPosts() {
      setIsLoading(true);
      try {
        const response = await axios.get(`post/paginated-feed`);
        const feedPosts: Post[] = response.data.data.feedPosts;
        setPosts(feedPosts);
      } catch (error: any) {
        console.log(error);
        setError(error?.response?.data?.message || "Failed to load posts.");
      } finally {
        setIsLoading(false);
      }
    }
    getPosts();
  }, []);

  return (
    <div className="mx-auto pt-24 p-4 max-w-screen-2xl dark:bg-gray-900 dark:backdrop-blur-3xl">
      <BackgroundGradient />
      {isLoading ? (
        <Loader message="Fetching posts..." />
      ) : error ? (
        <p className="mx-auto px-4 py-2 w-fit text-center text-red-500 bg-gray-900 bg-opacity-30 rounded-md">
          {error}
        </p>
      ) : (
        <div className="w-fit mx-auto grid grid-cols-1">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              _id={post._id}
              college={post.college.name}
              username={post.owner.username}
              title={post.title}
              content={post.content}
              votes={post.votes}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Posts;
