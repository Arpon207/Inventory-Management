import React, { useState } from "react";
import "./AddItem.css";
import { useForm } from "react-hook-form";
import img from "../../Images/no-photo.jpg";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddItem = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setLoading(true);
    const item = { ...data, image: imageSrc };
    if (item) {
      const url = `http://localhost:5000/inventory/items/add`;
      axios.post(url, item).then((response) => {
        if (response.status === 200) {
          setLoading(false);
          toast.success("Item added successfully.");
          navigate("/manage-inventory");
        }
      });
    }
  };
  const handleGetImage = (e) => {
    const file = e.target.files[0];
    const maxAllowedSize = 2 * 1024 * 1024;
    if (file.size > maxAllowedSize) {
      e.target.value = "";
      setImageSrc("");
      alert("Image size is too large.");
      return;
    }
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
  };
  console.log(errors);
  return (
    <>
      <div className="add-item">
        <h3>Add Item</h3>
        <div className="add-item-container">
          <div className="preview-image">
            <div className="image-box">
              <img src={imageSrc || img} alt="" />
            </div>
            <input
              type="file"
              name="image"
              onChange={handleGetImage}
              accept="image/png, image/gif, image/jpeg"
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                {...register("name", { required: "this is required" })}
                placeholder="Name"
                id="name"
              />
              <input
                {...register("category", { required: "this is required" })}
                placeholder="Category"
                id="category"
              />
            </div>
            <input
              type="number"
              {...register("price", { required: "this is required" })}
              placeholder="Price"
            />
            <input
              type="number"
              {...register("quantity", { required: "this is required" })}
              placeholder="Quantity"
            />
            <textarea
              {...register("description", { required: "this is required" })}
              cols="30"
              rows="5"
              placeholder="Description"
            ></textarea>
            <input
              {...register("supplier", { required: "this is required" })}
              placeholder="Supplier"
            />
            <input className="submit-btn" type="submit" value={"ADD"} />
          </form>
        </div>
        {loading ? (
          <div className="loading-background">
            <div className="loading">
              <Spinner animation="border" variant="success" />
            </div>
          </div>
        ) : undefined}
      </div>
    </>
  );
};

export default AddItem;