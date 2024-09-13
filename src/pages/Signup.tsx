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
    <div className="relative isolate bg-white dark:bg-gray-900 h-screen">
      <BackgroundGradient />
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
