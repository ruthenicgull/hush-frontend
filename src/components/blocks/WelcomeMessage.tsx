import { Link } from "react-router-dom";

export function WelcomeMessage() {
  return (
    <div className="text-white text-center">
      <p className="text-xl">Welcome back!</p>
      <Link to={"/home"} className="text-sm text-gray-400 underline">
        Go To Home Page
      </Link>
    </div>
  );
}
