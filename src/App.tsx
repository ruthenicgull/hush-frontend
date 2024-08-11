import { Outlet } from "react-router-dom";
import Navbar from "./components/blocks/Navbar";

function App() {
  return (
    <div className=" dark:bg-gray-900">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
