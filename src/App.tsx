import { Outlet } from "react-router-dom";
import Navbar from "./components/blocks/Navbar";
import useRefreshToken from "./hooks/useRefresh";
import { useEffect } from "react";

function App() {
  const refresh = useRefreshToken();

  useEffect(() => {
    refresh();
  }, [refresh]); // Refresh token every time the component re-renders

  return (
    <div className=" dark:bg-gray-900">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
