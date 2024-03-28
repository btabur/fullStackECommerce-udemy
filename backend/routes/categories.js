const express = require("express");

const Category = require("../models/Category.js")

const router = express.Router()


//Yeni bir kategori oluşturma 
router.post("/",async (req,res)=> {
    try {
        const {name,img} = req.body;

        const newCategory = new Category({name,img})
        await newCategory.save()

        res.status(201).json(newCategory)
        
    } catch (error) {
        console.log(error);
        
    }
})

//Tüm kategorileri getirme

router.get("/",async(req,res)=> {
   try {
    const categories = await Category.find()

    res.status(200).json(categories)
   } catch (error) {
    res.status(500).json({error:"Server Error"})
   }
})

module.exports= router;