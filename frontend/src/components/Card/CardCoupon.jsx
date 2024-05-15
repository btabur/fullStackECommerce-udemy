import { message } from "antd"
import { useContext, useState } from "react"
import { CardContext } from "../../context/CardProvider"


const CardCoupon = () => {
  const [couponCode,setCouponCode]= useState("")
  const apiUrl = import.meta.env.VITE_API_BASE_URL
  const {cardItems,setcardItems} = useContext(CardContext);
  const [isCouponApply,setIsCouponApply] = useState(false)
  const applyCoupon =async ()=> {
    if(couponCode.trim().length===0) {
      message.info("boş değer girilemez")
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/coupons/code/${couponCode}`)

      if(!response.ok) {
        message.info("Girdiğiniz indirimi kodu bulunamadı");
        return;
      }
      const data = await response.json();
   
      const discountPercent = data.discountPercent
      const updatedCard  = cardItems.map((item) => {
        const updatePrice = item.price*(1-discountPercent/100)
       
        return {...item,price:updatePrice}
      })
      setcardItems(updatedCard);

      message.success(couponCode+ "kupon kodu başarı ile uygulandı")
      setIsCouponApply(true)
      
    } catch (error) {
      
    }
  }
  return (
    <div className="actions-wrapper">
                <div className="coupon">
                  <input
                    type="text"
                    className="input-text"
                    placeholder="Coupon code"
                   
                    onChange={(e)=>setCouponCode(e.target.value)}
                    value={couponCode}
                  />
                  <button className="btn" type="button"  disabled={isCouponApply} onClick={applyCoupon}>Apply Coupon</button>
                </div>
                <div className="update-cart">
                  <button className="btn">Update Cart</button>
                </div>
              </div>
  )
}

export default CardCoupon
