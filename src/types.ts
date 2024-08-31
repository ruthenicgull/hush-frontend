export type Vote = "upvote" | "downvote" | "none";
export type Comment = {
  _id: string;
  username: string;
  content: string;
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
