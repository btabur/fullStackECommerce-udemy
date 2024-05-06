import ReviewForm from './ReviewForm'
import ReviewItem from './ReviewItem'
import './Reviews.css'

const Reviews = ({active,product,setProduct}) => {
  return (
    <div className={`tab-panel-reviews ${active}`}>
  
    <div className="comments">
      {product.reviews.length>0 ? 
      <>
        <h3> { product.reviews.length} reviews for {product.name}</h3>
       <ol className="comment-list">
       {product.reviews.map((item,i)=> (
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
