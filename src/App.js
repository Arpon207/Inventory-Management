import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import icon from "./Images/Icons/go-up.png";
import Router from "./Router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 500) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, []);

  const handleNavigate = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="App">
      {show && (
        <div className="scroll-top" onClick={handleNavigate}>
          <img src={icon} alt="" />
        </div>
      )}
      <Navbar />
      <Router />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
