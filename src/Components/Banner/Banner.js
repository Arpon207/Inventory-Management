import React from "react";
import "./Banner.css";
import bannerImg from "../../Images/banner-2.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import { motion } from "framer-motion";
import { banner, bannerButton } from "../../animation";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <section className="banner ">
      <motion.div
        variants={banner}
        initial="hidden"
        animate="visible"
        className="banner-content"
      >
        <h1>Manage your inventory in the best possible way</h1>
        <p>
          As a part of your supply chain, inventory management includes aspects
          such as controlling and overseeing purchases from suppliers as well as
          customers maintaining the storage of stock, controlling the amount of
          product for sale, and order fullfillment.
        </p>
        <button onClick={() => navigate("manage-inventory")}>
          Manage Inventory{" "}
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
          src={bannerImg}
          alt=""
        />
      </div>
    </section>
  );
};

export default Banner;
