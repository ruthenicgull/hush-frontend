import { useState } from "react";
import axios from "axios";
import { AuthFormDataType } from "@/types";

function useSignUp() {
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
      await axios.post(`user/register`, formData);
      setIsVerificationSent(true);
    } catch (error: any) {
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
        `user/verify-email?code=${verificationCode}`,
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

  return {
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
  };
}

export default useSignUp;
