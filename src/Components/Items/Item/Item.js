import React from "react";
import { motion } from "framer-motion";
import { itemsHeader } from "../../../animation";
import { useNavigate } from "react-router-dom";
import "./Item.css";

const Item = ({ item }) => {
  const { _id, name, image, price, description } = item;
  const navigate = useNavigate();
  return (
    <motion.div
      variants={itemsHeader}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      key={_id}
      className="item-card"
    >
      <img src={image} alt="" />
      <div className="item-desc">
        <h3 className="fs-5">{name.length > 28 ? name.slice(0, 28) : name}</h3>
        <p>{description.slice(0, 100)}...</p>
        <h5 className="fs-6">Price: $ {price}.00</h5>
        <button onClick={() => navigate(`/manage-inventory/${_id}`)}>
          Manage
        </button>
      </div>
    </motion.div>
  );
};

export default Item;
