import axios from "@/api/axios";
import { logoutUser, selectAccessToken } from "@/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function useLogout() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector(selectAccessToken);

  const logout = async () => {
    dispatch(logoutUser()); // Remove user data from the store
    setError(null); // Reset error state on successful logout
    try {
      await axios.post(
        "user/logout",
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      navigate("/"); // Redirect to home page on successful logout
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
        toast(errorMessage);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
        toast(errorMessage);
      }
      console.log("Failed to log out", error);
    }
  };

  return logout;
}

export default useLogout;
