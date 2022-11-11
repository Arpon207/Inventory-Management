import React from "react";
import { Helmet } from "react-helmet-async";

const PageTitle = ({ page }) => {
  return (
    <Helmet>
      <title>{page} - Inventory Management</title>
    </Helmet>
  );
};

export default PageTitle;
