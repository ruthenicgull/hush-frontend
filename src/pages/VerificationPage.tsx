import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type VerificationPageProps = {
  email: string;
  verificationCode: string;
  onVerificationCodeChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onVerifyCodeClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  error: string | null;
};

export function VerificationPage({
  email,
  verificationCode,
  onVerificationCodeChange,
  onVerifyCodeClick,
  error,
}: VerificationPageProps) {
  return (
    <div className="flex items-center justify-center bg-neutral-500 bg-opacity-15 p-8 rounded-lg shadow-lg">
      <div className="mx-auto grid w-full gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold dark:text-white">
            Verify Your Email
          </h1>
          <p className="text-muted-foreground dark:text-gray-400">
            A verification code has been sent to your email ({email}). Please
            enter it below.
          </p>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="verificationCode" className="dark:text-gray-300">
              Verification Code
            </Label>
            <Input
              id="verificationCode"
              type="text"
              required
              className="dark:bg-gray-800 dark:text-white dark:border-gray-600"
              value={verificationCode}
              onChange={onVerificationCodeChange}
            />
          </div>
          <Button
            type="submit"
            className="w-full dark:bg-indigo-600 dark:text-white"
            onClick={onVerifyCodeClick}
          >
            Verify Code
          </Button>
        </div>
      </div>
    </div>
  );
}
