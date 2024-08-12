export type Vote = "upvote" | "downvote" | "none";
export type Comment = {
  _id: string;
  username: string;
  content: string;
};
