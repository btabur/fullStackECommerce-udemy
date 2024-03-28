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

// belirli bir kategoriyi getirme

router.get("/:categoryId", async ( req,res)=> {

    try {
        const categoryId = req.params.categoryId;
        try {
            const category = await Category.findById(categoryId)
            res.status(200).json(category)
            
        } catch (error) {
            res.status(404).json({error:"Category not found"})
        }

    } catch (error) {
        res.status(500).json({error:"Server Error"})
    }
    
})
//kategori güncelleme
router.put("/:categoryId", async ( req,res)=> {
    try {
        const categoryId = req.params.categoryId;
        const updates = req.body;
        const existingCategory = await Category.findById(categoryId)

        if(!existingCategory) {
            return  res.status(500).json({error:'Category not found'})
        }

       const updated =await Category.findByIdAndUpdate(categoryId,updates,{new:true});

       res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({error:'Server Error'})
        
    }
})

// kategori silme işlemi
router.delete("/:categoryId" , async (req,res)=> {
    try {
        
        const categoryId = req.params.categoryId;

        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if(!deletedCategory) {
            return res.status(404).json("category not found")
        }
        res.status(200).json(deletedCategory)
    } catch (error) {
        res.status(500).json({error:'Server Error'+error})
        
    }
})

module.exports= router;