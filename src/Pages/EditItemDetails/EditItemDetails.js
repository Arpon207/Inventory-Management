import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loading from "../../Components/Loading/Loading";
import PageTitle from "./../../Components/PageTitle/PageTitle";

const EditItemDetails = () => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const location = useLocation();

  const navigate = useNavigate();

  const { name, image, price, quantity, rest } = location?.state;

  useEffect(() => {
    const url = `https://inventory-management207.herokuapp.com/inventory/items/${id}`;
    axios.get(url).then((response) => setItem(response.data));
  }, [id]);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: name,
      price: price,
      supplier: rest.supplier,
      description: rest.description,
      quantity: quantity,
      category: rest.category,
    },
  });

  const onSubmit = (data) => {
    const updateData = {
      image: image,
      sold: rest.sold,
      email: rest.email,
      totalSold: rest.totalSold,
      ...data,
    };

    if (updateData) {
      const url = `https://inventory-management207.herokuapp.com/inventory/items/edit/${id}`;
      axios.put(url, updateData).then((response) => {
        if (response.status === 200) {
          setLoading(false);
          toast.success("Item updated successfully.");
          navigate("/manage-inventory");
        }
      });
    }
  };

  return (
    <>
      <PageTitle page="EDIT ITEM" />
      <div className="add-item">
        <h3>Edit Item</h3>
        <div className="add-item-container">
          <div className="preview-image">
            <div className="image-box">
              <img src={item.image?.url} alt="" />
            </div>
            <p>Image can't be changed.</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input {...register("name")} placeholder="Name" id="name" />
              <input
                {...register("category")}
                placeholder="Category"
                id="category"
              />
            </div>
            <input type="number" {...register("price")} placeholder="Price" />
            <input
              type="number"
              {...register("quantity")}
              placeholder="Quantity"
            />
            <textarea
              {...register("description")}
              cols="30"
              rows="5"
              placeholder="Description"
            ></textarea>
            <input {...register("supplier")} placeholder="Supplier" />
            <input className="submit-btn" type="submit" value={"Submit"} />
          </form>
        </div>
        {loading ? <Loading className={"add-item-loading"} /> : undefined}
      </div>
    </>
  );
};

export default EditItemDetails;
