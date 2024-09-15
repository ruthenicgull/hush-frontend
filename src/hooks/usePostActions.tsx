import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "@/api/axios";
import { VoteType } from "@/types";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/features/user/userSlice";
import useDebounce from "./useDebounce";

export function usePostActions(postId: string) {
  const [voteType, setVoteType] = useState<VoteType>("none");
  const [upvotes, setUpvotes] = useState<number>(0); // No longer initialized with props, fetched from API
  const [pendingVote, setPendingVote] = useState<VoteType | null>(null);

  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Debounced value for pending votes
  const debouncedVote = useDebounce(pendingVote, 400); // Adjust the debounce delay as needed

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch the initial vote count
        const votesResponse = await axios.get(`/vote/post/count/${postId}`);
        setUpvotes(votesResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [postId]);

  useEffect(() => {
    async function fetchVoteType() {
      const response = await axios.get(`/vote/type/post/${postId}`, {
        withCredentials: true,
      });
      setVoteType(response.data.data);
    }
    if (isAuthenticated) {
      fetchVoteType();
    }
  }, []);

  useEffect(() => {
    if (debouncedVote !== null) {
      handleVote(debouncedVote);
    }
  }, [debouncedVote]);

  async function handleVote(newVoteType: VoteType) {
    if (!isAuthenticated) {
      toast.error("Login to vote");
      return;
    }

    const endpoint = `vote/post/${postId}`;

    try {
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

      if (response.status === 200) {
        // Fetch updated vote count after voting
        const votesResponse = await axios.get(`/vote/post/count/${postId}`);
        setUpvotes(votesResponse.data.data);
        setVoteType(newVoteType);
      } else {
        toast.error("Failed to update vote");
        throw new Error("Failed to update vote");
      }
    } catch (error) {
      console.error("Error updating vote:", error);
    }
  }

  function onUpvote() {
    const newVoteType = voteType === "upvote" ? "none" : "upvote";
    setPendingVote(newVoteType); // Set pending vote, debounced execution
  }

  function onDownvote() {
    const newVoteType = voteType === "downvote" ? "none" : "downvote";
    setPendingVote(newVoteType); // Set pending vote, debounced execution
  }

  function onShare() {
    navigator.clipboard.writeText(`localhost:5173/posts/${postId}`);
    toast("Share link copied to clipboard");
  }

  return {
    voteType,
    upvotes,
    onUpvote,
    onDownvote,
    onShare,
  };
}
