import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { container, item, navlogo } from "../../animation";
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import useNavlinks from "./../../Hooks/useNavlinks";

const Navbar = () => {
  const [background, setBackground] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const { links } = useNavlinks();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 80) {
        setBackground(true);
      } else {
        setBackground(false);
      }
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isOpen]);

  return (
    <motion.nav
      className={
        location.pathname === "/"
          ? `${background ? "nav-bg" : "nav-bg-transparent"}`
          : "nav-dark"
      }
    >
      <motion.div
        variants={navlogo}
        initial="hidden"
        animate="visible"
        className="navbar-logo"
      >
        <Link to={"/"}>
          <h3>Inventory</h3>
        </Link>
      </motion.div>
      <div
        className={
          isOpen ? "navbar-link-container open" : "navbar-link-container"
        }
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="navbar-links"
        >
          {links.map(({ name, path, div }, i) => (
            <motion.li key={i} variants={item}>
              <NavLink
                className={({ isActive }) => isActive && name && "active"}
                to={path}
                end
              >
                {name ? name : div}
              </NavLink>
            </motion.li>
          ))}
        </motion.div>
      </div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="menu-toggle-btn"
      >
        {isOpen ? <AiOutlineClose style={{ color: "black" }} /> : <HiMenu />}
      </button>
    </motion.nav>
  );
};

export default Navbar;
