import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

type SignUpFormProps = {
  onFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFormSubmit: (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  error: string | null;
};

export function SignUpForm({
  onFormChange,
  onFormSubmit,
  error,
}: SignUpFormProps) {
  return (
    <div className="relative h-full w-full flex items-center justify-center bg-neutral-500 bg-opacity-20 dark:bg-black dark:bg-opacity-30 p-8 rounded-lg shadow-lg">
      <Link to={"/"} className="absolute top-4 left-4">
        <ArrowLeft />
      </Link>
      <div className="mx-auto grid w-full gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold dark:text-white">Sign Up</h1>
          <p className="text-muted-foreground dark:text-gray-400">
            Enter your college email below to create a new account
          </p>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <form className="grid gap-4" onSubmit={onFormSubmit}>
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
            onClick={onFormSubmit}
          >
            Sign Up
          </Button>
        </form>
        <div className="mt-4 text-center text-sm dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="underline dark:text-gray-300">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
