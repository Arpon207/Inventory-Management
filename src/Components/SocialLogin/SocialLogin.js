import React, { useEffect } from "react";
import "./SocialLogin.css";

//icons
import { GrFacebookOption } from "react-icons/gr";
import { FaGoogle } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";

//firebase hooks
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "./../../Firebase/firebase.init";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useGetToken from "./../../Hooks/useGetToken";

const SocialLogin = () => {
  const [signInWithGoogle, user] = useSignInWithGoogle(auth);

  const [token] = useGetToken(user);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user]);

  return (
    <div className="social-login-btns">
      <button>
        <GrFacebookOption />
      </button>
      <button onClick={() => signInWithGoogle()}>
        <FaGoogle />
      </button>
      <button>
        <AiOutlineTwitter />
      </button>
    </div>
  );
};

export default SocialLogin;
