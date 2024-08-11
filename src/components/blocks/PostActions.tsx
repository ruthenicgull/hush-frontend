import { ArrowUp, ArrowDown, MessageSquare, Share2 } from "lucide-react";

interface PostActionsProps {
  upvotes: number;
  comments: number;
  vote: "upvote" | "downvote" | "none";
  onUpvote?: () => void;
  onDownvote?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

function PostActions({
  upvotes,
  comments,
  vote,
  onUpvote,
  onDownvote,
  onComment,
  onShare,
}: PostActionsProps) {
  return (
    <div className="flex items-center space-x-4 text-xs">
      <button
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
        onClick={onUpvote}
      >
        <ArrowUp
          strokeWidth={5}
          className={`w-4 h-4 mr-1 ${vote === "upvote" && "text-indigo-500"}`}
        />
      </button>
      <span className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white">
        {upvotes}
      </span>
      <button
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
        onClick={onDownvote}
      >
        <ArrowDown
          strokeWidth={5}
          className={`w-4 h-4 mr-1 ${vote === "downvote" && "text-indigo-500"}`}
        />
      </button>
      <button
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
        onClick={onComment}
      >
        <MessageSquare className="w-4 h-4 mr-1" />
        <span>{comments}</span>
      </button>
      <button
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
        onClick={onShare}
      >
        <Share2 className="w-4 h-4 mr-1" />
        <span>Share</span>
      </button>
    </div>
  );
}

export default PostActions;
