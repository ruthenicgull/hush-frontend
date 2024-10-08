import {
  ArrowRight,
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Share2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { usePostActions } from "@/hooks/usePostActions";
import { useNavigate } from "react-router-dom";

type Props = {
  _id: string;
  college: string;
  username: string;
  title: string;
  content: string;
  // votes: number; // Just pass this as initial state
};

function PostCard({ _id, college, username, title, content }: Props) {
  const { voteType, upvotes, comments, onUpvote, onDownvote, onShare } =
    usePostActions(_id);
  const navigate = useNavigate();

  return (
    <div
      className="flex gap-4 bg-gray-500 bg-opacity-15 hover:bg-opacity-30 shadow-sm border border-gray-300 hover:border-gray-500 dark:border-gray-700 dark:hover:border-gray-500 rounded-xl p-4 items-start cursor-default"
      onClick={() => navigate(`/posts/${_id}`)}
    >
      <div className="rounded-full text-gray-900 dark:text-white">
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
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {content.length > 300 ? content.slice(0, 300) + "..." : content}
          </p>
        </div>
        <div
          className="flex justify-between flex-wrap pt-2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center space-x-4 text-xs">
            <button
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
              onClick={onUpvote}
            >
              <ArrowUp
                strokeWidth={5}
                className={`w-4 h-4 mr-1 ${
                  voteType === "upvote" && "text-indigo-500"
                }`}
              />
            </button>
            <span className="text-gray-900 dark:text-gray-100">{upvotes}</span>
            <button
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
              onClick={onDownvote}
            >
              <ArrowDown
                strokeWidth={5}
                className={`w-4 h-4 mr-1 ${
                  voteType === "downvote" && "text-red-500"
                }`}
              />
            </button>
            <Link
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
              to={`/posts/${_id}`}
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              <span>{comments}</span>
            </Link>
            <button
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
              onClick={onShare}
            >
              <Share2 className="w-4 h-4 mr-1" />
            </button>
          </div>
          <Link
            to={`/posts/${_id}`}
            className="group text-gray-500 hover:text-black dark:hover:text-white text-sm p-2"
          >
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 ease-in-out duration-150" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
