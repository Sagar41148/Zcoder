import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import Signup from "./Signup";

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [authScreen, setAuthScreen] = useState<"login" | "signup" | "reset">(
    "login"
  );

  return (
    <>
      
      <div
        className="fixed inset-0 bg-black bg-opacity-60 z-40"
        onClick={onClose}
      ></div>

   
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="w-full sm:w-[400px] bg-white rounded-lg shadow-lg mx-4 p-6 relative bg-[#dadbeb]"
          onClick={(e) => e.stopPropagation()}  
        >
           
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-300"
            >
              <IoCloseSharp className="text-black text-lg" />
            </button>
          </div>
 
          {authScreen === "login" && (
            <Login
              onForgotPassword={() => setAuthScreen("reset")}
              onSignup={() => setAuthScreen("signup")}
            />
          )}
          {authScreen === "signup" && (
            <Signup onLogin={() => setAuthScreen("login")} />
          )}
          {authScreen === "reset" && (
            <ResetPassword onLogin={() => setAuthScreen("login")} />
          )}
        </div>
      </div>
    </>
  );
};

export default AuthModal;
