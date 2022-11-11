import React from "react";
import Banner from "../../Components/Banner/Banner";
import Items from "../../Components/Items/Items";
import "./Home.css";
import PageTitle from "./../../Components/PageTitle/PageTitle";

const Home = () => {
  return (
    <>
      <PageTitle page="HOME" />
      <Banner />
      {/* <Items /> */}
    </>
  );
};

export default Home;
