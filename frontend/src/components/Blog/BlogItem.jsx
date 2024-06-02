import { useEffect, useState } from 'react';
import './Blogs.css'

const BlogItem = ({blog}) => {

  const [date,setDate]= useState()

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('tr-TR', options).format(date);
  }
  useEffect(()=> {
      setDate(formatDate(blog.createdAt))
  },[])

  return (
    <li className="blog-item">
    <a href="#" className="blog-image">
      <img src={blog.blogPhoto} alt=""/>
    </a>
    <div className="blog-info">
      <div className="blog-info-top">
        <span>{date}</span>
        -
        <span> {blog.reviews.length} Comments</span>
      </div>
      <div className="blog-info-center">
        <a href="#">{blog.blogTitle}</a>
      </div>
      <div className="blog-info-bottom">
        <a href={`/blog/${blog._id}`}>Read More</a>
      </div>
    </div>
  </li>
  )
}

export default BlogItem
