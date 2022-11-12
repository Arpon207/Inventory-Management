import React, { useEffect, useState } from "react";
import "./ManageInventory.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./../../Components/ConfirmModal/ConfirmModal";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./../../Firebase/firebase.init";
import { signOut } from "firebase/auth";
import PageTitle from "../../Components/PageTitle/PageTitle";
import Loading from "../../Components/Loading/Loading";

const ManageInventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [id, setId] = useState({ itemId: "", cloudinaryId: "" });
  const [searchText, setSearchText] = useState("");
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchItems();
  }, [searchText]);

  const fetchItems = async () => {
    const email = user.email;
    try {
      const { data } = await axios.get(
        `https://inventory-management207.herokuapp.com/inventory/items?email=${email}&searchText=${searchText}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (data) {
        setLoading(false);
        setItems(data);
      }
    } catch (error) {
      setLoading(false);
      if (error.response.status === 401 || error.response.status === 403) {
        signOut(auth);
        navigate("/signin");
      }
    }
  };

  const handleSetState = (itemId, cloudinaryId) => {
    setId({ itemId: itemId, cloudinaryId: cloudinaryId });
    setModalShow(true);
  };

  const handleDelete = () => {
    axios
      .delete(
        `https://inventory-management207.herokuapp.com/inventory/items/delete?itemId=${id.itemId}&cloudinaryId=${id.cloudinaryId}`
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

  const totalPrice = items.reduce(
    (initialPrice, item) => initialPrice + item.price * item.quantity,
    0
  );

  return (
    <>
      <PageTitle page="MANAGE" />
      <div className="manage-inventory">
        <div className="manage-inventory-header">
          <input
            type="search"
            id="search"
            name="search"
            placeholder="search by name"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="add-item-btn"
            onClick={() => navigate("/manage-inventory/add")}
          >
            ADD NEW ITEM
          </button>
        </div>
        {loading ? (
          <Loading />
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
            <tbody>
              {items.map(
                ({ _id, name, price, quantity, image, ...rest }, i) => (
                  <tr
                    className={quantity === 0 ? "bg-danger" : undefined}
                    key={i}
                  >
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
                      <button
                        onClick={() =>
                          navigate(`/manage-inventory/edit/${_id}`, {
                            state: {
                              _id,
                              name,
                              price,
                              quantity,
                              image,
                              rest,
                            },
                          })
                        }
                        className="edit-btn"
                      >
                        <AiFillEdit />
                      </button>
                      <button
                        onClick={() => handleSetState(_id, image.id)}
                        className="delete-btn"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        ) : (
          <div className="empty-items-container">
            <p>No items to show.</p>
            <button onClick={() => navigate("/manage-inventory/add")}>
              ADD NEW ITEM
            </button>
          </div>
        )}
        <div className="inventory-status">
          <div>
            <small>Total Items</small>
            <h3>{items.length}</h3>
          </div>
          <div>
            <small>Total value</small>
            <h3>{totalPrice.toLocaleString("en-US")}.00</h3>
          </div>
          <div>
            <small>Out of stock</small>
            <h3>{items.filter((item) => item.quantity === 0).length}</h3>
          </div>
        </div>
        <ConfirmModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
};

export default ManageInventory;
