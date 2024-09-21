import Comment from "@/components/blocks/Comment";
import { useState, useEffect } from "react";
import axios from "@/api/axios";
import { Loader } from "../ui/Loader";
import { CommentType } from "@/types";

type CommentsListPropsType = {
  post_id: string | null;
};

function CommentsList({ post_id }: CommentsListPropsType) {
  const [comments, setComments] = useState<Array<CommentType>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchComments() {
      setIsLoading(true);
      try {
        const response = await axios.get(`/comments/post/${post_id}`);
        setComments(response.data.data);

        console.log(response.data);
      } catch (error: any) {
        console.error(error);
        setError(error?.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchComments();
  }, [post_id]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div>
          {comments.length > 0 ? (
            <>
              <h4 className="dark:text-white font-bold p-2 text-center">
                Comments
              </h4>
              <div className="flex flex-col">
                {comments.map((comment) => (
                  <Comment
                    key={comment._id}
                    _id={comment._id}
                    user_id={comment.owner}
                    content={comment.content}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="text-center dark:text-gray-500 text-sm">
              No comments yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default CommentsList;
