import React from "react";
import { Route, Routes } from "react-router-dom";
import AddItem from "./Pages/AddItem/AddItem";
import Blogs from "./Pages/Blogs/Blogs";
import Home from "./Pages/Home/Home";
import ManageInventory from "./Pages/ManageInventory/ManageInventory";
import SingleItemDetails from "./Pages/SingleItemDetails/SingleItemDetails";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/manage-inventory" element={<ManageInventory />} />
      <Route path="/manage-inventory/:id" element={<SingleItemDetails />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/signin" element={<p>Signin</p>} />
      <Route path="/signup" element={<p>Signup</p>} />
      <Route path="/manage-inventory/add" element={<AddItem />} />
    </Routes>
  );
};

export default Router;
