import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { apiUrl } from "@/constants";
import { Loader } from "@/components/ui/Loader";
import { VerificationPage } from "@/pages/VerificationPage";
import { SignUpForm } from "@/components/blocks/SignUpForm";
import { AuthFormDataType } from "@/types";

function SignUp() {
  const [formData, setFormData] = useState<AuthFormDataType>({
    email: "",
    password: "",
  });
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isVerificationSent, setIsVerificationSent] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function onFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  }

  function onVerificationCodeChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setVerificationCode(event.target.value);
  }

  async function onFormSubmit(
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await axios.post(`${apiUrl}/user/register`, formData);
      setIsVerificationSent(true);
    } catch (error: any) {
      console.log(error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function onVerifyCodeClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${apiUrl}/user/verify-email?code=${verificationCode}`,
        { params: { email: formData.email } }
      );

      if (response.data.success) {
        setIsVerified(true);
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (error: any) {
      setError("Failed to verify code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto w-screen h-screen flex flex-col justify-center items-center p-6 bg-white dark:bg-black">
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
  );
}

export default SignUp;
