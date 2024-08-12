import PostCard from "@/components/blocks/PostCard";
import BackgroundGradient from "@/components/ui/backgroundGradient";
import { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

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

  // Fetching posts from an API using axios
  useEffect(() => {
    async function getPosts() {
      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/post/paginated-feed`
        );
        const feedPosts = response.data.data.feedPosts;
        setPosts(feedPosts);
      } catch (error) {
        console.log(error);
      }
    }
    getPosts();
  }, []);

  return (
    <div className="mx-auto pt-24 p-4 max-w-screen-2xl dark:bg-gray-900 dark:backdrop-blur-3xl">
      <BackgroundGradient />
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
    </div>
  );
}

export default Posts;
