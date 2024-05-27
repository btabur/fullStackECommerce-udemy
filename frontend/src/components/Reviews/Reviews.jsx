import { useEffect, useState } from 'react'
import ReviewForm from './ReviewForm'
import ReviewItem from './ReviewItem'
import './Reviews.css'
import { message } from 'antd'

const Reviews = ({active,product,setProduct}) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [users,setUsers] = useState([]);
  const thisReview=[]

  const fetchUsers = async()=> {
       
    try {
       
        const response = await fetch(`${apiUrl}/api/users`)
      
       if(response.ok){
        const data = await response.json();
        setUsers(data)
       }else {
        message.error("Kullanıcılar getirilemedi ")
       }

    } catch (error) {
        console.log("Giriş hatası",error);
    }
    
}
product && product.reviews.forEach(review => {
  const matchingUsers = users?.filter(user=> user._id === review.user)
    matchingUsers.forEach(matchingUser=> {
      thisReview.push(({
        review,
        user:matchingUser
      }))
  })
});

  useEffect(()=> {
    fetchUsers()
  },[])
  return (
    <div className={`tab-panel-reviews ${active}`}>
  
    <div className="comments">
      {product && product.reviews.length>0 ? 
      <>
        <h3> { product.reviews.length} reviews for {product.name}</h3>
       <ol className="comment-list">
       {thisReview.map((item,i)=> (
               <ReviewItem key={i} reviewItem={item}/>
       ))}
     
     </ol>
      </>
      
     :
     <h3>Hiç yorum yapılmadı</h3>
      }
     
    </div>

    <div className="review-form-wrapper">
      <h2>Add a review</h2>
      <ReviewForm product={product} setProduct={setProduct}/>
    </div>
  
  </div>
  )
}

export default Reviews
