import { useState } from "react";
import { Button } from "@/components/ui/button";
import Login from "@/components/blocks/Login";
import SignUp from "@/components/blocks/SignUp";

function AuthDialogs() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  return (
    <div>
      <div className="flex gap-4">
        <Button variant="secondary" onClick={() => setIsLoginOpen(true)}>
          Login
        </Button>
        <Button onClick={() => setIsSignUpOpen(true)}>Sign Up</Button>
      </div>
      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
      {isSignUpOpen && <SignUp onClose={() => setIsSignUpOpen(false)} />}
    </div>
  );
}

export default AuthDialogs;
