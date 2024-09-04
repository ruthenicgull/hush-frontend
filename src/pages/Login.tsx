import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { apiUrl } from "@/constants";
import { userSlice } from "@/features/user/userSlice";
import { AuthFormDataType } from "@/types";
import { Loader } from "@/components/ui/Loader";
import { LoginForm } from "@/components/blocks/LoginForm";
import { WelcomeMessage } from "@/components/blocks/WelcomeMessage";
import BackgroundGradient from "@/components/ui/backgroundGradient"; // Import the gradient
import { RootState } from "@/app/store";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState<AuthFormDataType>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    console.log(user);
  }, [user]);

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
      const response = await axios.post(`${apiUrl}/user/login`, formData);
      dispatch(
        userSlice.actions.setUser({
          data: response.data.data.user,
          accessToken: response.data.data.accessToken,
          refreshToken: response.data.data.refreshToken,
        })
      );

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
    <div className="relative isolate bg-white dark:bg-gray-900 h-screen">
      <BackgroundGradient />
      <div className="relative z-10 flex flex-col justify-center items-center p-6 h-full">
        {isLoading ? (
          <Loader
            message="Please wait..."
            subMessage="We're processing your request"
          />
        ) : !isLoggedIn ? (
          <LoginForm
            formData={formData}
            onFormChange={onFormChange}
            onFormSubmit={onFormSubmit}
            error={error}
          />
        ) : (
          <>
            <WelcomeMessage />
            <Link to={"/profile/66d02f4eda0d1c8b95d46ab2"}>here</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
