import axios from "@/api/axios";
import { Share2 } from "lucide-react";
import { useEffect, useState } from "react";

type CommentPropTypes = {
  _id: string;
  user_id: string;
  content: string;
};

function Comment({ _id, user_id, content }: CommentPropTypes) {
  const [commenter, setCommenter] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        // Fetch user info for display name
        const response = await axios.get(`/user/${user_id}`);
        console.log(response.data.data);
        // Update user name in the comment
        setCommenter(response.data.data.username);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="flex justify-between p-2 rounded-lg shadow-sm text-sm">
      <div className="text-gray-900 dark:text-gray-100 flex gap-2">
        <span className="font-bold text-indigo-950 dark:text-indigo-200">
          {commenter}
        </span>
        <span className="">{content}</span>
      </div>

      <button
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
        onClick={() => console.log(`Share comment ${_id}`)}
      >
        <Share2 className="w-4 h-4 mr-1" />
      </button>
    </div>
  );
}

export default Comment;
