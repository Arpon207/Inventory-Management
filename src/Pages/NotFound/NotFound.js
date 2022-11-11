import React from "react";
import "./NotFound.css";
import { motion } from "framer-motion";
import { NotFoundContainer, numberAnimation } from "../../animation";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const numbers = [4, 0, 4];
  const navigate = useNavigate();
  return (
    <div className="notFound">
      <div>
        <motion.div
          className="status"
          variants={NotFoundContainer}
          initial={"hidden"}
          animate={"visible"}
        >
          {numbers.map((number) => (
            <motion.span variants={numberAnimation}>{number}</motion.span>
          ))}
        </motion.div>
        <div>
          <h3>Oops!</h3>
          <p>
            We're sorry
            <br />
            The page you were looking for doesn't exist.
          </p>
          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
