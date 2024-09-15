import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PostFormDataType } from "@/types";
import { useState } from "react";
import { Loader } from "../ui/Loader";
import axios from "@/api/axios";
import { create } from "domain";
import { toast } from "sonner";

function CreatePost() {
  const [postFormData, setPostFormData] = useState<PostFormDataType>({
    title: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPostFormData({
      ...postFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    async function createPost() {
      setIsLoading(true);
      try {
        await axios.post(`/post`, postFormData, {
          withCredentials: true,
        });
        toast("Post created successfully!");
        setPostFormData({ title: "", content: "" });
      } catch (error: any) {
        console.log(error);
        setError(error?.response?.data?.message || "Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    }
    createPost();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md sm:w-md dark:text-white">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p className="text-red-300 text-sm">{error}</p>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Create Post</DialogTitle>
              <DialogDescription>
                Talk about anything and everything.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-2 ">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={postFormData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  maxLength={300}
                  value={postFormData.content}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>
                Post
              </Button>
            </DialogFooter>{" "}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CreatePost;
