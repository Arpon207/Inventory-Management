import React from "react";
import { Spinner } from "react-bootstrap";
import "./Loading.css";

const Loading = ({ className }) => {
  return (
    <div className={`loading ${className}`}>
      <div className="loading">
        <Spinner animation="border" variant="success" />
      </div>
    </div>
  );
};

export default Loading;
