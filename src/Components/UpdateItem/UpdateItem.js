import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "./UpdateItem.css";

const UpdateItem = ({ id, item, setItem }) => {
  const [isActive, setIsActive] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    const price = parseInt(e.target.price.value) || item.price;
    const quantity =
      parseInt(e.target.quantity.value) + item.quantity || item.quantity;
    const url = `https://inventory-management207.herokuapp.com/inventory/items/${id}`;
    if (parseInt(e.target.price.value) || parseInt(e.target.quantity.value)) {
      axios
        .put(url, {
          price,
          quantity,
        })
        .then((response) => {
          if (response.data) {
            setItem({
              ...item,
              price: response.data.price,
              quantity: response.data.quantity,
            });
            e.target.reset();
            toast.success("Item successfully updated");
          }
        });
    }
  };

  return (
    <div className="update-item">
      <h3 onClick={() => setIsActive((prev) => !prev)}>Update</h3>
      <form
        className={isActive ? "form form-active" : "form"}
        onSubmit={onSubmit}
      >
        <div className="input-box">
          <label htmlFor="price">Price</label>
          <input type="number" name="price" id="price" />
        </div>
        <div className="input-box">
          <label htmlFor="quantity">Quantity</label>
          <input type="number" name="quantity" id="quantity" />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateItem;
