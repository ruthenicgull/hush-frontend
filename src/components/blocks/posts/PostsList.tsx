import PostCard from "@/components/blocks/PostCard"; // Adjust the import based on your file structure
import { PostType } from "@/types";

interface PostsListProps {
  posts: PostType[];
}

function PostsList({ posts }: PostsListProps) {
  return (
    <>
      {posts.map((post) => (
        <PostCard
          key={post._id}
          _id={post._id}
          college={post.college}
          username={post.owner}
          title={post.title}
          content={post.content}
        />
      ))}
    </>
  );
}

export default PostsList;
