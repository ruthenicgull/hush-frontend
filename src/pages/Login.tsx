import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthFormDataType } from "@/types";
import { Loader } from "@/components/ui/Loader";
import axios from "axios";
import { apiUrl } from "@/constants";

function Login() {
  const [formData, setFormData] = useState<AuthFormDataType>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function onFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  }

  async function onFormSubmit(
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await axios.post(`${apiUrl}/user/login`, formData);
      setIsLoggedIn(true);
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto w-screen h-screen flex flex-col justify-center items-center p-6 bg-white dark:bg-black">
      {isLoading ? (
        <Loader
          message="Please wait..."
          subMessage="We're processing your request"
        />
      ) : !isLoggedIn ? (
        <div className="flex items-center justify-center bg-neutral-500 bg-opacity-20 p-8 rounded-lg shadow-lg">
          <div className="mx-auto grid w-full gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold dark:text-white">Login</h1>
              <p className="text-balance text-muted-foreground dark:text-gray-400">
                Enter your email below to login to your account
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
                  onChange={onFormChange}
                  value={formData.email}
                  required
                  className="dark:bg-gray-800 dark:text-white dark:border-gray-600"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="dark:text-gray-300">
                    Password
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline dark:text-gray-400"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={onFormChange}
                  value={formData.password}
                  className="dark:bg-gray-800 dark:text-white dark:border-gray-600"
                />
              </div>
              <Button
                type="submit"
                className="w-full dark:bg-indigo-600 dark:text-white"
                onClick={onFormSubmit}
              >
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline dark:text-gray-300">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-white text-center">
          <p className="text-xl">Welcome back!</p>
          <Link to={"/home"} className="text-sm text-gray-400 underline">
            Go To Home Page
          </Link>
        </div>
      )}
    </div>
  );
}

export default Login;
