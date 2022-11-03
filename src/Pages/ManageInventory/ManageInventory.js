import React, { useEffect, useState } from "react";
import "./ManageInventory.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner, Table } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ConfirmModal from "./../../Components/ConfirmModal/ConfirmModal";
import { toast } from "react-toastify";

const ManageInventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [id, setId] = useState({ itemId: "", cloudinaryId: "" });
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios
      .get("http://localhost:5000/inventory/items/")
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setItems(response.data);
        }
      })
      .catch((error) => {
        if (error) {
          setLoading(false);
        }
      });
  };

  const handleSetState = (itemId, cloudinaryId) => {
    setId({ itemId: itemId, cloudinaryId: cloudinaryId });
    setModalShow(true);
  };

  const handleDelete = () => {
    axios
      .delete(
        `http://localhost:5000/inventory/items/delete?itemId=${id.itemId}&cloudinaryId=${id.cloudinaryId}`
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success("Item deleted successfully");
          const remaining = items.filter(
            (item) => item._id !== response.data._id
          );
          setItems(remaining);
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
        <button
          className="add-item-btn"
          onClick={() => navigate("/manage-inventory/add")}
        >
          ADD NEW ITEM
        </button>
      </div>
      {loading ? (
        <div className="loader">
          <Spinner animation="border" variant="success" />
        </div>
      ) : items.length > 0 ? (
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
            {items.map(({ _id, name, price, quantity, image }, i) => (
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
                  <button
                    onClick={() => handleSetState(_id, image.id)}
                    className="delete-btn"
                  >
                    <MdDelete />
                  </button>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </Table>
      ) : (
        <div className="empty-items-container">
          <p>No items to show.</p>
          <button onClick={() => navigate("/manage-inventory/add")}>
            ADD NEW ITEM
          </button>
        </div>
      )}
      <ConfirmModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ManageInventory;
