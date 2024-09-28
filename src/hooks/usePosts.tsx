import { useState, useEffect } from "react";
import axios from "@/api/axios";

type Post = {
  _id: string;
  college: string;
  owner: string;
  title: string;
  content: string;
  votes: number;
};

type UsePostsProps = {
  sort: string;
  page: number;
};

const usePosts = ({ sort, page }: UsePostsProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const getPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `post/feed?page=${page}&limit=10&sort=${sort}`
      );
      const feedPosts: Post[] = response.data.data.feedPosts.map(
        (post: any) => ({
          _id: post._id,
          title: post.title,
          college: post.college.name,
          content: post.content,
          owner: post.owner.username,
          votes: post.votes,
        })
      );
      setPosts((prevPosts) =>
        page === 1 ? feedPosts : [...prevPosts, ...feedPosts]
      );
      setHasNextPage(response.data.data.pagination.hasNextPage);
    } catch (error: any) {
      setError(error?.response?.data?.message || "Failed to load posts.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, [page, sort]);

  return { posts, isLoading, error, hasNextPage };
};

export default usePosts;
