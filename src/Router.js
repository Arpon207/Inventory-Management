import React from "react";
import { Route, Routes } from "react-router-dom";
import AddItem from "./Pages/AddItem/AddItem";
import Signin from "./Pages/Authentication/Signin";
import Blogs from "./Pages/Blogs/Blogs";
import Home from "./Pages/Home/Home";
import ManageInventory from "./Pages/ManageInventory/ManageInventory";
import SingleItemDetails from "./Pages/SingleItemDetails/SingleItemDetails";
import Signup from "./Pages/Authentication/Signup";
import RequireAuth from "./Pages/Authentication/RequireAuth";
import EditItemDetails from "./Pages/EditItemDetails/EditItemDetails.js";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/manage-inventory"
        element={
          <RequireAuth>
            <ManageInventory />
          </RequireAuth>
        }
      />
      <Route path="/manage-inventory/:id" element={<SingleItemDetails />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/manage-inventory/add" element={<AddItem />} />
      <Route path="/manage-inventory/edit/:id" element={<EditItemDetails />} />
    </Routes>
  );
};

export default Router;
