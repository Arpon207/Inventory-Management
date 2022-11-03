import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./../../Firebase/firebase.init";
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const RequireAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    <div className="loading-background">
      <div className="loading">
        <Spinner animation="border" variant="success" />
      </div>
    </div>;
  }

  if (!user) {
    return <Navigate to={"/signin"} state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
