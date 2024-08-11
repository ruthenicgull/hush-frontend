import PostCard from "@/components/blocks/PostCard";
import SearchBar from "@/components/blocks/SearchBar";
import BackgroundGradient from "@/components/ui/backgroundGradient";
import { useEffect, useState } from "react";
import axios from "axios";

type Post = {
  college: {
    name: string;
  };
  owner: {
    username: string;
  };
  title: string;
  content: string;
};

function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetching posts from an API using axios
  useEffect(() => {
    async function getPosts() {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/post/paginated-feed"
        );
        console.log(response.data.data.feedPosts);
        setPosts(response.data.data.feedPosts);
      } catch (error) {
        console.log(error);
      }
    }
    getPosts();
  }, []);

  return (
    <div className="mx-auto pt-24 p-4 max-w-screen-2xl dark:bg-gray-900 dark:backdrop-blur-3xl">
      <BackgroundGradient />
      <SearchBar />
      <div className="w-fit mx-auto grid grid-cols-1">
        {posts.map((post, index) => (
          <PostCard
            key={index}
            _id={post._id}
            college={post.college.name}
            username={post.owner.username}
            title={post.title}
            content={post.content}
          />
        ))}
      </div>
    </div>
  );
}

export default Posts;
