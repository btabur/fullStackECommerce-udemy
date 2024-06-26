
import CategoryItem from './CategoryItem'
import './Categories.css'
import { useEffect, useState } from 'react'

const Categories = () => {
  const [categories,setCategories] = useState([])
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchCategories = async()=> {
       
    try {
  
        const response = await fetch(`${apiUrl}/api/categories`)
      
       if(response.ok){
        const data = await response.json();
        setCategories(data)
       }else {
        message.error("Kategoriler getirilemedi ")
       }

    } catch (error) {
        console.log("Giriş hatası",error);
    }
    
}

useEffect(()=> {
  fetchCategories()
},[apiUrl])
  return (
    <section className="categories">
    <div className="container">
      <div className="section-title">
        <h2>All Categories</h2>
        <p>Summer Collection New Morden Design</p>
      </div>
      <ul className="category-list">
        {
          categories.map((category)=>(
            <CategoryItem key={category._id} category={category}/>
          ))
        }
       
       
        
      </ul>
    </div>
  </section>
  )
}

export default Categories
