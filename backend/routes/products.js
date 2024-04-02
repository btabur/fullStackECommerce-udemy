const express = require("express");

const router = express.Router()
const Product = require("../models/Product.js")


//Yeni bir ürün oluşturma 
router.post("/",async (req,res)=> {
    try {
      
        const newProduct = new Product(req.body)
        await newProduct.save()

        res.status(201).json(newProduct)
        
    } catch (error) {
        console.log(error);
        
    }
})

//Tüm ürünleri getirme

router.get("/",async(req,res)=> {
    try {
     const products = await Product.find()
 
     res.status(200).json(products)
    } catch (error) {
     res.status(500).json({error:"Server Error"})
    }
 })

 // belirli bir ürünü getirme

router.get("/:productId", async ( req,res)=> {

    try {
        const productId = req.params.productId;
      
            const product = await Product.findById(productId)
            res.status(200).json(product)

            if(!product) {
              return  res.status(404).json({error:"Product not found"})
            }
            
       

    } catch (error) {
        res.status(500).json({error:"Server Error"})
    }
    
})

//ürünü güncelleme
router.put("/:productId", async ( req,res)=> {
    try {
        const productId = req.params.productId;
        const updates = req.body;
        const existingProduct = await Product.findById(productId)

        if(!existingProduct) {
            return  res.status(500).json({error:'Product not found'})
        }

       const updated =await Product.findByIdAndUpdate(productId,updates,{new:true});

       res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({error:'Server Error'})
        
    }
})

// ürün silme işlemi
router.delete("/:productId" , async (req,res)=> {
    try {
        
        const productId = req.params.productId;

        const deletedProduct = await Product.findByIdAndDelete(productId);

        if(!deletedProduct) {
            return res.status(404).json("product not found")
        }
        res.status(200).json(deletedProduct)
    } catch (error) {
        res.status(500).json({error:'Server Error'+error})
        
    }
})

module.exports= router;