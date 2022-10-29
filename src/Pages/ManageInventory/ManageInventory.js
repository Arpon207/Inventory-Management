import React, { useEffect, useState } from "react";
import "./ManageInventory.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner, Table } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ManageInventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios.get("http://localhost:5000/inventory/items/").then((response) => {
      if (response.data.length > 0) {
        setLoading(false);
        setItems(response.data);
      }
    });
  };

  return (
    <div className="manage-inventory">
      <div className="manage-inventory-header">
        <input
          type="search"
          name="search"
          id="seach"
          placeholder="Search by Name"
        />
        <button className="add-item-btn">ADD NEW ITEM</button>
      </div>
      {items.length > 0 ? (
        <Table className="items-table" responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th id="th-name">Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <motion.tbody>
            {items.map(({ _id, name, price, quantity }, i) => (
              <motion.tr key={i}>
                <td>{i + 1}</td>
                <td
                  onClick={() => navigate(`/manage-inventory/${_id}`)}
                  id="td-name"
                >
                  {name}
                </td>
                <td>$ {price}.00</td>
                <td>{quantity}</td>
                <td>$ {price * quantity}.00</td>
                <td className="buttons">
                  <button className="edit-btn">
                    <AiFillEdit />
                  </button>
                  <button className="delete-btn">
                    <MdDelete />
                  </button>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </Table>
      ) : loading ? (
        <div className="loader">
          <Spinner animation="border" variant="success" />
        </div>
      ) : (
        <div className="empty-items-container">
          <p>No items to show.</p>
          <button>Add new item</button>
        </div>
      )}
    </div>
  );
};

export default ManageInventory;
