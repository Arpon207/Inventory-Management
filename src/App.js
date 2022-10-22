import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import icon from "./Images/Icons/go-up.png";
import Router from "./Router";

function App() {
  const [show, setShow] = useState(false);

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
    </div>
  );
}

export default App;
