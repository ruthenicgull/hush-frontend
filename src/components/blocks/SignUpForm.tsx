import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SignUpFormProps = {
  onFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitButtonClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  error: string | null;
};

export function SignUpForm({
  onFormChange,
  onSubmitButtonClick,
  error,
}: SignUpFormProps) {
  return (
    <div className="flex items-center justify-center bg-neutral-500 bg-opacity-20 p-8 rounded-lg shadow-lg">
      <div className="mx-auto grid w-full gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold dark:text-white">Sign Up</h1>
          <p className="text-muted-foreground dark:text-gray-400">
            Enter your college email below to create a new account
          </p>
          {error && <p className="text-red-500">{error}</p>}
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
      </div>
    </div>
  );
}
