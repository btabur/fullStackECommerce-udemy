import React, { useEffect, useState } from "react";
import "./BlogDetail.css";
import Reviews from "../Reviews/Reviews";

const BlogDetail = () => {
  const pathName = window.location.pathname;

  const [blog, setBlog] = useState([]);
  const [date, setDate] = useState("");

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // Geçersiz tarih kontrolü
      return "Geçersiz tarih";
    }
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("tr-TR", options).format(date);
  }

  const fetchBlog = async () => {
    try {
      const response = await fetch(`${apiUrl}/api${pathName}`);
      if (response.ok) {
        const data = await response.json();
        setBlog(data);
      } else {
        message.error("Bloglar getirilemedi");
      }
    } catch (error) {
      console.log("Giriş hatası", error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [apiUrl]);

  useEffect(() => {
    if (blog && blog.createdAt) {
      setDate(formatDate(blog.createdAt));
    }
  }, [blog]);
  return (
    <section className="single-blog">
      <div className="container">
        <article>
          <figure>
            <a href="#">
              <img src={blog.blogPhoto} alt="" />
            </a>
          </figure>
          <div className="blog-wrapper">
            <div className="blog-meta">
              <div className="blog-category">
                <a href="#">COLLECTION</a>
              </div>
              <div className="blog-date">
                <a href="#">{date}</a>
              </div>
              <div className="blog-tags">
                <a href="#">products</a>,<a href="#">coats</a>
              </div>
            </div>
            <h1 className="blog-title">{blog.blogTitle}</h1>
            <div className="blog-content">
              <p
                className="blog-description"
                // html etiketi içerisinde gelen verileri aynen gösterebilmek için
                dangerouslySetInnerHTML={{ __html: blog.description }}
              ></p>
            </div>
          </div>
        </article>
        <Reviews />
      </div>
    </section>
  );
};

export default BlogDetail;
