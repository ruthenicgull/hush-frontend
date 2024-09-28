import { Link } from "react-router-dom";

export function WelcomeMessage() {
  return (
    <div className="text-white text-center">
      <p className="text-xl">Welcome back!</p>
      <Link to={"/home"} className="text-sm underline">
        Go To Profile
      </Link>
    </div>
  );
}
