import { Link } from "react-router-dom";
import { Loader } from "@/components/ui/Loader";
import { VerificationPage } from "@/pages/VerificationPage";
import { SignUpForm } from "@/components/blocks/SignUpForm";
import BackgroundGradient from "@/components/ui/backgroundGradient"; // Import the gradient
import useSignup from "@/hooks/useSignup";

function SignUp() {
  const {
    formData,
    verificationCode,
    isVerificationSent,
    isVerified,
    isLoading,
    error,
    onFormChange,
    onVerificationCodeChange,
    onFormSubmit,
    onVerifyCodeClick,
  } = useSignup();

  return (
    <div className="grid grid-cols-2 relative isolate bg-white dark:bg-gray-900 h-screen overflow-hidden">
      <BackgroundGradient />
      <div className="flex flex-col gap-2 items-center justify-center text-center">
        <span className="text-[5rem] font-bold text-indigo-500">Welcome!</span>
        <span className="text-gray-400">
          Create your account to get started.
        </span>
      </div>
      <div className="relative z-10 flex flex-col justify-center items-center p-6 h-full">
        {isLoading ? (
          <Loader
            message="Please wait..."
            subMessage="We're sending you a verification code..."
          />
        ) : !isVerificationSent ? (
          <SignUpForm
            onFormChange={onFormChange}
            onFormSubmit={onFormSubmit}
            error={error}
          />
        ) : !isVerified ? (
          <VerificationPage
            email={formData.email}
            verificationCode={verificationCode}
            onVerificationCodeChange={onVerificationCodeChange}
            onVerifyCodeClick={onVerifyCodeClick}
            error={error}
          />
        ) : (
          <div className="text-center">
            <h1 className="text-3xl font-bold dark:text-white">Thank You!</h1>
            <p className="text-muted-foreground dark:text-gray-400">
              Your email has been verified. You can now log in.
            </p>
            <Link to="/login" className="underline dark:text-gray-300">
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUp;
