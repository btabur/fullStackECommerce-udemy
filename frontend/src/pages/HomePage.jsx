
import Sliders from "../components/Slider/Sliders";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";

import Campains from "../components/Campains/Campains";
import Blogs from "../components/Blog/Blogs";
import Brands from "../components/Brand/Brands";
import CampainSingle from "../components/Campain-Single/CampainSingle";
import React from "react";
const HomePage = () => {
  return (
    <React.Fragment>
      <Sliders />
      <Categories />
      <Products title="Featured Products" />
      <Campains />
      <Products title="New Arrivals" />
      <Blogs />
      <Brands />
      <CampainSingle />
    </React.Fragment>
  );
};

export default HomePage;
