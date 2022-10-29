import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./SingleItemDetails.css";
import UpdateItem from "../../Components/UpdateItem/UpdateItem";
import { motion } from "framer-motion";
import { singleItemAnimation } from "../../animation";

const SingleItemDetails = () => {
  const [item, setItem] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const url = `http://localhost:5000/inventory/items/${id}`;
    axios.get(url).then((response) => setItem(response.data));
  }, [id]);

  const handleDelivery = (id) => {
    const url = `http://localhost:5000/inventory/items/${id}`;
    axios
      .put(url, {
        quantity: item.quantity - 1,
        sold: item.sold + 1,
      })
      .then((response) => {
        setItem({
          ...item,
          quantity: response.data.quantity,
          sold: response.data.sold,
        });
      });
  };

  return (
    <>
      <section className="single-item">
        <motion.div
          className="overview"
          variants={singleItemAnimation}
          initial="hidden"
          animate="visible"
        >
          <img src={item.image} alt="" />
          <p className="overview-title">OVERVIEW</p>
          <p className="item-desc">{item.description}</p>
          <div className="total-count">
            <div>
              <p>Total Value</p>
              <h1>{item.price * item.quantity} $</h1>
            </div>
            <div>
              <p>Total Sold</p>
              <h1>{item.price * item.sold} $</h1>
            </div>
            <div></div>
          </div>
        </motion.div>
        <motion.div
          variants={singleItemAnimation}
          initial="hidden"
          animate="visible"
          className="item-detail"
        >
          <p className="item-title">{item.name}</p>
          <p className="item-price">
            Price: <span>$ {item.price}.00</span>
          </p>
          <div className="item-specs">
            <p>Specifications :</p>
            <ul>
              <li>Frame : {item.specification?.frame}</li>
              <li>Brakes : {item.specification?.brakes}</li>
              <li>
                Sizes : [
                {item.specification?.sizes
                  .slice(0, item.specification?.sizes.length - 1)
                  .map((size) => (
                    <span>{size + ", "}</span>
                  ))}
                <span>
                  {item.specification?.sizes.slice(
                    item.specification?.sizes.length - 1,
                    item.specification?.sizes.length
                  )}
                </span>
                ]
              </li>
              <li>Weight : {item.specification?.weight}</li>
            </ul>
          </div>
          <p className="supplier">Suppler : {item.supplierName}</p>
          <div className="inventory">
            <p>
              Quantity: <span>{item.quantity}</span>
            </p>
            <p>
              Sold: <span>{item.sold}</span>
            </p>
          </div>
          <button onClick={() => handleDelivery(id)} className="delivered-btn">
            Delivered
          </button>
          <UpdateItem id={id} setItem={setItem} item={item} />
        </motion.div>
      </section>
    </>
  );
};

export default SingleItemDetails;
