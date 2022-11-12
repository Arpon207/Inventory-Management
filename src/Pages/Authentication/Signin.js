import React, { useEffect } from "react";
import "./Authentication.css";
import { useForm } from "react-hook-form";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import { useLocation, useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "./../../Firebase/firebase.init";
import useGetToken from "./../../Hooks/useGetToken";
import PageTitle from "./../../Components/PageTitle/PageTitle";

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [signInWithEmailAndPassword, user] =
    useSignInWithEmailAndPassword(auth);

  const onSubmit = (data) => {
    if (data) {
      signInWithEmailAndPassword(data.email, data.password);
    }
  };

  const [token] = useGetToken(user);

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token]);

  return (
    <>
      <PageTitle page="SIGNIN" />
      <div className="signin">
        <div className="signin-form-container">
          <header>
            <h3>Signin</h3>
            <SocialLogin />
          </header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-box">
              <input
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /[a-z0-9]+@gmail.com/,
                    message: "Please provide valid gmail.",
                  },
                })}
                placeholder="Email"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className="input-box">
              <input
                type="password"
                {...register("password", {
                  required: "Password is required.",
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message:
                      "Password should contain minimum eight characters, at least one letter and one number.",
                  },
                })}
                placeholder="Password"
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <input type="submit" />
          </form>
          <p onClick={() => navigate("/signup", { state: from })}>
            Don't have an account?
          </p>
        </div>
      </div>
    </>
  );
};

export default Signin;
