import { useEffect, useState } from "react";

function useFetchTimer(delay: number): boolean | undefined {
  const [switchTimer, setSwitchTimer] = useState<boolean>(false);

  useEffect(() => {
    const id = setInterval(() => {
      setSwitchTimer((prev) => !prev);
    }, delay);

    return () => clearInterval(id);
  }, [delay]);

  return switchTimer;
}

export default useFetchTimer;
