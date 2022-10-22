import React from "react";
import "./Banner.css";
import logo2 from "../../Images/benefits-of-inventory-management-software-removebg-preview.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import { motion } from "framer-motion";
import { banner, bannerButton } from "../../animation";

const Banner = () => {
  return (
    <section className="banner ">
      <motion.div
        variants={banner}
        initial="hidden"
        animate="visible"
        className="banner-content"
      >
        <h1>
          Manage your inventory in the <br /> best possible way
        </h1>
        <p>
          As a part of your supply chain, inventory management includes aspects
          such as controlling and overseeing purchases from suppliers as well as
          customers maintaining the storage of stock, controlling the amount of
          product for sale, and order fullfillment.
        </p>
        <button>
          Explore{" "}
          <motion.span
            variants={bannerButton}
            initial="hidden"
            animate="visible"
          >
            <MdOutlineKeyboardArrowRight className="arrow" />
          </motion.span>
        </button>
      </motion.div>
      <div className="banner-img">
        <motion.img
          variants={banner}
          initial="hidden"
          animate="visible"
          src={logo2}
          alt=""
        />
      </div>
    </section>
  );
};

export default Banner;
