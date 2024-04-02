const express = require("express");

const Coupon = require("../models/Coupon.js")

const router = express.Router()


//Yeni bir kupon oluşturma 
router.post("/",async (req,res)=> {
    try {
        const {code}= req.body;

        const existingCoupon = await Coupon.findOne({code})
        if(existingCoupon) {
            return res.status(400).json("This copuon is already exists")
        }

        const newCoupon = new Coupon(req.body)
        await newCoupon.save()

        res.status(201).json(newCoupon)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Server Error"})
    }
})

//Tüm kuponları getirme

router.get("/",async(req,res)=> {
    try {
       
     const coupons = await Coupon.find()
 
     res.status(200).json(coupons)
    } catch (error) {
     res.status(500).json({error:"Server Error"})
    }
 })
 

 // belirli bir kuponu getirme(read single by coupon id)

 router.get("/:couponId", async ( req,res)=> {

    try {
        const couponId = req.params.couponId;
      
            const coupon = await Coupon.findById(couponId)
          

            if(!coupon) {
              return  res.status(404).json({error:"coupon not found"})
            }
            res.status(200).json(coupon)

    } catch (error) {
        res.status(500).json({error:"Server Error"})
    }
    
})


 // belirli bir kuponu getirme (read single by coupon code)

 router.get("/code/:couponCode", async ( req,res)=> {

    try {
        const couponCode = req.params.couponCode;
      
            const coupon = await Coupon.findOne({code:couponCode})
          

            if(!coupon) {
              return  res.status(404).json({error:"coupon not found"})
            }
            const {discountPercent}= coupon
            res.status(200).json({discountPercent})

    } catch (error) {
        res.status(500).json({error:"Server Error"})
    }
    
})

//kuponu güncelleme
router.put("/:couponId", async ( req,res)=> {
    try {
        const couponId = req.params.couponId;
        const updates = req.body;
        const existingCoupon = await Coupon.findById(couponId)

        if(!existingCoupon) {
            return  res.status(500).json({error:'Coupon not found'})
        }

       const updated =await Coupon.findByIdAndUpdate(couponId,updates,{new:true});

       res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({error:'Server Error'})
        
    }
})

// kupon silme işlemi
router.delete("/:couponId" , async (req,res)=> {
    try {
        
        const couponId = req.params.couponId;

        const deletedCoupon = await Coupon.findByIdAndDelete(couponId);

        if(!deletedCoupon) {
            return res.status(404).json("product not found")
        }
        res.status(200).json(deletedCoupon)
    } catch (error) {
        res.status(500).json({error:'Server Error'+error})
        
    }
})

module.exports = router