import PostCard from "@/components/blocks/PostCard"; // Adjust the import based on your file structure

interface Post {
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
}

interface PostsListProps {
  posts: Post[];
}

function PostsList({ posts }: PostsListProps) {
  return (
    <>
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
    </>
  );
}

export default PostsList;
