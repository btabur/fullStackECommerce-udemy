import { useEffect, useState } from 'react';
import BlogItem from './BlogItem'
import './Blogs.css'

const Blogs = () => {

  const [blogs, setBlogs] = useState([]);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const fetchBlogs = async()=> {
       
    try {
  
        const response = await fetch(`${apiUrl}/api/blog`)
      
       if(response.ok){
        const data = await response.json();
        setBlogs(data)
       }else {
        message.error("bloglar getirilemedi ")
       }

    } catch (error) {
        console.log("Giriş hatası",error);
    }
    
}

useEffect(()=> {
  fetchBlogs()
},[apiUrl])
  return (
    <section className="blogs">
    <div className="container">
      <div className="section-title">
        <h2>From Our Blog</h2>
        <p>Summer Collection New Morden Design</p>
      </div>
      <ul className="blog-list">
        {blogs.map((blog)=> (
            <BlogItem key={blog._id} blog={blog}/>
        ))}
     
      </ul>
    </div>
  </section>
  )
}

export default Blogs
