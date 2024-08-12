import { useDispatch, useSelector } from "react-redux";
import {
  openLoginDialog,
  closeLoginDialog,
  openSignUpDialog,
  closeSignUpDialog,
} from "@/app/features/auth/authSlice";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import Login from "@/components/blocks/Login";
import SignUp from "@/components/blocks/SignUp";

function AuthDialogs() {
  const dispatch = useDispatch();
  const { isLoginOpen, isSignUpOpen } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <div>
      <div className="flex gap-4">
        <Button variant="secondary" onClick={() => dispatch(openLoginDialog())}>
          Login
        </Button>
        <Button onClick={() => dispatch(openSignUpDialog())}>Sign Up</Button>
      </div>
      {isLoginOpen && <Login onClose={() => dispatch(closeLoginDialog())} />}
      {isSignUpOpen && <SignUp onClose={() => dispatch(closeSignUpDialog())} />}
    </div>
  );
}

export default AuthDialogs;
