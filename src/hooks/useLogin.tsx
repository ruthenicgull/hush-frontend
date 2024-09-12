import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "@/api/axios";
import { setUser } from "@/features/user/userSlice";
import { AuthFormDataType } from "@/types";

function useLogin() {
  const [formData, setFormData] = useState<AuthFormDataType>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

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
      const response = await axios.post(`/user/login`, formData, {
        withCredentials: true,
      });
      dispatch(
        setUser({
          user_id: response?.data?.data?.user?._id,
          username: response?.data?.data?.user?.username,
          email: response?.data?.data?.user?.email,
          accessToken: response?.data?.data?.accessToken,
          refreshToken: response?.data?.data?.refreshToken,
          isAuthenticated: true,
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

  return { formData, isLoading, isLoggedIn, error, onFormChange, onFormSubmit };
}

export default useLogin;
