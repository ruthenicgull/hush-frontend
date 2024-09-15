export type VoteType = "upvote" | "downvote" | "none";
export type CommentType = {
  _id: string;
  owner: string;
  content: string;
  votes: number; // initial votes
};
export type AuthFormDataType = {
  email: string;
  password: string;
};
export type User = {
  _id: string;
  username: string;
  email: string;
  college: {
    _id: string;
    name: string;
  };
};
export type PostFormDataType = {
  title: string;
  content: string;
};
