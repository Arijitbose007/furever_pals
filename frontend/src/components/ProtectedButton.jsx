import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const ProtectedButton = ({ children, redirectTo }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!isAuthenticated) {
      await loginWithRedirect({
        appState: { returnTo: redirectTo },
      });
    } else {
      navigate(redirectTo);
    }
  };

  return (
    <button
      type="button"
      className="inline-flex items-center border bg-header-orange-dark btn mt-0 py-4 px-6 font-bold rounded-full"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default ProtectedButton;
