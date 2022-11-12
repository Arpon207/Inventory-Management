import React, { useEffect, useState } from "react";
import "./Items.css";
import axios from "axios";
import { motion } from "framer-motion";
import { itemsHeader } from "../../animation";

import { FiArrowRight } from "react-icons/fi";
import Item from "./Item/Item";

const Items = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get("https://inventory-management207.herokuapp.com/inventory/items/")
      .then((response) => setItems(response.data));
  }, []);

  return (
    <section className="items Container">
      <motion.h1
        variants={itemsHeader}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Recently Added
      </motion.h1>
      <div className="items-card-container">
        {items.map((item) => (
          <Item key={item._id} item={item} />
        ))}
      </div>
      <div style={{ textAlign: "right" }}>
        <button>
          Manage Inventories <FiArrowRight />
        </button>
      </div>
    </section>
  );
};

export default Items;
