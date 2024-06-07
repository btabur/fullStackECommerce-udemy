import { useEffect, useState } from 'react'
import ReviewForm from './ReviewForm'
import ReviewItem from './ReviewItemBlog'
import './Reviews.css'
import { message } from 'antd'
import ReviewItemBlog from './ReviewItemBlog'


const ReviewsBlog = ({blog,setBlog}) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [users,setUsers] = useState([]);
  const [thisReview,setThisReview] = useState([])
 

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
 

  useEffect(()=> {
    fetchUsers()
  },[])
  useEffect(()=> {
    if(blog && blog.reviews?.length) {
      blog.reviews.forEach(review => {
        const matchingUsers = users?.filter(user=> user._id === review.user)
          matchingUsers.forEach(matchingUser=> {
            thisReview.push(({
              review,
              user:matchingUser
            }))
        })
      });
     }


  },[blog])
  return (
    <div className={`tab-panel-reviews content active`}>
  
    <div className="comments">
      {blog ? 
      <>
        <h3> {blog.reviews?.length} reviews for {blog.blogTitle}</h3>
       <ol className="comment-list">
        {thisReview.map((item,i)=> 
                <ReviewItemBlog key={i} reviewItem={item}/>
        )
        }
     
     </ol>
      </>
      
     :
     <h3>Hiç yorum yapılmadı</h3>
      }
     
    </div>

    <div className="review-form-wrapper">
      <h2>Add a review</h2>
      <ReviewForm blog={blog} setBlog={setBlog}/>
    </div>
  
  </div>
  )
}

export default ReviewsBlog
