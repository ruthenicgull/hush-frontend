import { LoaderCircle } from "lucide-react";

type LoaderProps = {
  message?: string;
  subMessage?: string;
};

export function Loader({ message, subMessage }: LoaderProps) {
  return (
    <div className="mx-auto flex flex-col items-center justify-center text-center dark:text-white">
      {message && <p className="text-lg">{message}</p>}
      {subMessage && <p className="text-sm">{subMessage}</p>}
      <LoaderCircle className="animate-spin text-indigo-500 mt-4" size={30} />
    </div>
  );
}
