import { Outlet } from "react-router-dom";
import Navbar from "./components/blocks/Navbar";
import useRefreshToken from "./hooks/useRefresh";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { selectIsAuthenticated } from "./features/user/userSlice";

type ContextType = { isUserLoggedIn: boolean };

function App() {
  const refresh = useRefreshToken();
  const isAuthenticated = useSelector((state: RootState) =>
    selectIsAuthenticated(state)
  );

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="dark:text-white">
      <Navbar />
      <Outlet
        context={{ isUserLoggedIn: isAuthenticated } satisfies ContextType}
      />
    </div>
  );
}

export default App;
