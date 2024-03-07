import React from "react";
import Header from "../components/Layout/Header/Header";
import Blogs from "../components/Blog/Blogs";
import Policy from "../components/Layout/Policy/Policy";
import Footer from "../components/Layout/Footer/Footer";

const BlogPage = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="blog-page">
        <Blogs />
      </div>

      <Policy />
      <Footer />
    </React.Fragment>
  );
};

export default BlogPage;
