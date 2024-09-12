import { Loader } from "@/components/ui/Loader";
import { LoginForm } from "@/components/blocks/LoginForm";
import { WelcomeMessage } from "@/components/blocks/WelcomeMessage";
import BackgroundGradient from "@/components/ui/backgroundGradient"; // Import the gradient
import useLogin from "@/hooks/useLogin";
import { Link } from "react-router-dom";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

function Login() {
  const { formData, isLoading, isLoggedIn, error, onFormChange, onFormSubmit } =
    useLogin();
  const user = useSelector((state: RootState) => state.user);

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
            <Link to={`/profile/${user.user_id}`}>Go to Profile</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
