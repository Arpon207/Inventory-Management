import { useForm } from "react-hook-form";
import SocialLogin from "./../../Components/SocialLogin/SocialLogin";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { auth } from "./../../Firebase/firebase.init";
import { useEffect } from "react";
import Loading from "../../Components/Loading/Loading";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [createUserWithEmailAndPassowrd, user, loading] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  const [updateProfile] = useUpdateProfile(auth);

  const onSubmit = async (data) => {
    if (data) {
      await createUserWithEmailAndPassowrd(data.email, data.password);
      await updateProfile({ displayName: data.username });
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state;

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user]);

  if (loading) {
    return <Loading className={"user-loading"} />;
  }

  return (
    <div className="signin">
      <div className="signin-form-container">
        <header>
          <h3>Signin</h3>
          <SocialLogin />
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-box">
            <input
              {...register("username", {
                required: "Username is required.",
                pattern: {
                  value: /[0-9a-zA-Z]{4,}/,
                  message: "Username is too short.",
                },
              })}
              placeholder="Name"
            />
            {errors.username && <p>{errors.username.message}</p>}
          </div>
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
          <div className="input-box">
            <input
              type="password"
              {...register("confirmpassword", {
                required: "Password is required.",
                validate: (value) => {
                  if (watch("password") !== value) {
                    return "Password mismatched.";
                  }
                },
              })}
              placeholder="Confirm Password"
            />
            {errors.confirmpassword && <p>{errors.confirmpassword.message}</p>}
          </div>
          <input type="submit" />
        </form>
        <p onClick={() => navigate("/signin")}>Already have an account?</p>
      </div>
    </div>
  );
};

export default Signup;
