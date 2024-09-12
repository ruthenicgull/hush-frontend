import axios from "@/api/axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/user/userSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      const response = await axios.post(
        "/user/refresh-access-token",
        {}, // Request body (empty in this case)
        {
          withCredentials: true,
        }
      );

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
    } catch (error) {
      console.error("Failed to refresh access token:", error);
    }
  };

  return refresh;
};

export default useRefreshToken;
