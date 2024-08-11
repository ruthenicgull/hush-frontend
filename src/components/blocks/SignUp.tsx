// components/SignUp.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"; // Import dialog components
import { useState } from "react";
import axios from "axios";

type Props = {
  onClose: () => void;
};

type FormData = {
  email: string;
  password: string;
};

function SignUp({ onClose }: Props) {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  function onFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  }

  async function onSubmitButtonClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    try {
      await axios({
        method: "post",
        url: "http://localhost:8000/api/v1/user/register",
        data: formData,
      });

      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="w-full max-w-lg p-6 bg-white dark:bg-black">
        <div className="flex items-center justify-center">
          <div className="mx-auto grid w-full gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold dark:text-white">Sign Up</h1>
              <p className="text-balance text-muted-foreground dark:text-gray-400">
                Enter your college email below to create a new account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="dark:text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  className="dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  onChange={onFormChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="dark:text-gray-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  className="dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  onChange={onFormChange}
                />
              </div>
              <Button
                type="submit"
                className="w-full dark:bg-indigo-600 dark:text-white"
                onClick={onSubmitButtonClick}
              >
                Sign Up
              </Button>
            </div>
            <div className="mt-4 text-center text-sm dark:text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="underline dark:text-gray-300">
                Login
              </Link>
            </div>
          </div>
        </div>
        <DialogClose asChild>
          <button onClick={onClose}>Close</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default SignUp;
