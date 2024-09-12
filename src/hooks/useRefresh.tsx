import axios from "@/api/axios";
import { useDispatch } from "react-redux";
import { userSlice } from "@/features/user/userSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    const response = await axios.post(
      "/user/refresh-access-token",
      {}, // Request body (empty in this case)
      {
        withCredentials: true,
      }
    );

    dispatch(
      userSlice.actions.setUser({
        user_id: response?.data?.data?.user_id,
        refreshToken: response?.data?.data?.refreshToken,
        accessToken: response?.data?.data?.accessToken,
      })
    );
  };

  return refresh;
};

export default useRefreshToken;
