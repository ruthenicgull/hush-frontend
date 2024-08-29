import { ArrowUp, ArrowDown, MessageSquare, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Vote, Comment } from "@/types";
import { apiUrl } from "@/constants";

interface PostActionsProps {
  postId: string;
  votes: number;
}

function PostActions({ postId, votes }: PostActionsProps) {
  const [voteType, setVoteType] = useState<Vote>("none");
  const [upvotes, setUpvotes] = useState(votes); // Initialize with the votes prop
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    // Fetch initial comment count from the server
    async function fetchData() {
      try {
        const postComments = await axios.get(
          `${apiUrl}/api/v1/comments/post/${postId}`
        );
        console.log(postComments);

        setComments(postComments.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [postId]);

  async function onUpvote() {
    const newVoteType = voteType === "upvote" ? "none" : "upvote";
    const voteChange =
      voteType === "upvote" ? -1 : voteType === "downvote" ? 2 : 1;

    try {
      const endpoint = `${apiUrl}/api/v1/vote/post/${postId}`;
      let response;
      if (newVoteType === "none") {
        response = await axios.delete(endpoint, { withCredentials: true });
      } else {
        response = await axios.post(
          endpoint,
          { type: newVoteType },
          { withCredentials: true }
        );
      }

      // Only update local state if the request is successful
      if (response.status === 200) {
        setUpvotes(upvotes + voteChange);
        setVoteType(newVoteType);
        toast("Vote updated successfully");
      } else {
        throw new Error("Failed to update vote");
      }
    } catch (error) {
      console.error("Error updating vote:", error);
      toast.error("Login to vote");
    }
  }

  async function onDownvote() {
    const newVoteType = voteType === "downvote" ? "none" : "downvote";
    const voteChange =
      voteType === "downvote" ? 1 : voteType === "upvote" ? -2 : -1;

    try {
      const endpoint = `${apiUrl}/api/v1/vote/post/${postId}`;
      let response;
      if (newVoteType === "none") {
        response = await axios.delete(endpoint, { withCredentials: true });
      } else {
        response = await axios.post(
          endpoint,
          { type: newVoteType },
          { withCredentials: true }
        );
      }

      // Only update local state if the request is successful
      if (response.status === 200) {
        setUpvotes(upvotes + voteChange);
        setVoteType(newVoteType);
        toast("Vote updated successfully");
      } else {
        throw new Error("Failed to update vote");
      }
    } catch (error) {
      console.error("Error updating vote:", error);
      toast.error("Login to vote");
    }
  }

  function onComment() {
    // Implement comment functionality here
    console.log("Comment clicked");
  }

  function onShare() {
    navigator.clipboard.writeText(`localhost:5173/posts/${postId}`);
    toast("Share link copied to clipboard");
  }

  return (
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
      <span className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white">
        {upvotes}
      </span>
      <button
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
        onClick={onDownvote}
      >
        <ArrowDown
          strokeWidth={5}
          className={`w-4 h-4 mr-1 ${
            voteType === "downvote" && "text-indigo-500"
          }`}
        />
      </button>
      <button
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
        onClick={onComment}
      >
        <MessageSquare className="w-4 h-4 mr-1" />
        <span>{comments.length}</span>
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
