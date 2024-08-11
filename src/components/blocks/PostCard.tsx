import { ArrowRight } from "lucide-react";
import PostActions from "./PostActions";

type Props = {
  _id: string;
  college: string;
  username: string;
  title: string;
  content: string;
};

function PostCard({ _id, college, username, title, content }: Props) {
  return (
    <div className="flex gap-4 bg-gray-100 shadow-sm dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-gray-500 rounded-xl p-4 m-4 items-start max-w-2xl cursor-default">
      <div className="rounded-full text-gray-900 dark:text-white ">
        {college?.slice(0, 2).toUpperCase()}
      </div>
      <div className="flex flex-col gap-2 flex-grow">
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {college}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{username}</p>
        </div>
        <div>
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {content.length > 100 ? content.slice(0, 100) + "..." : content}
          </p>
        </div>
        <div className="flex justify-between flex-wrap">
          <PostActions upvotes={300} comments={10} vote="none" />
          <button className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white">
            Read More <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
