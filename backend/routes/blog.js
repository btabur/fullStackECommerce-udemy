const express = require("express");

const router = express.Router()
const Blog = require("../models/Blog.js")


//Yeni bir blog oluşturma 
router.post("/",async (req,res)=> {
    try {
      
        const newBlog = new Blog(req.body)
        await newBlog.save()

        res.status(201).json(newBlog)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Server Error"})
        
    }
})

//Tüm blogları getirme

router.get("/",async(req,res)=> {
    try {
     const blogs = await Blog.find()
 
     res.status(200).json(blogs)
    } catch (error) {
     res.status(500).json({error:"Server Error"})
    }
 })

 // belirli bir blogu getirme

router.get("/:blogId", async ( req,res)=> {

    try {
        const blogId = req.params.blogId;
      
            const blog = await Blog.findById(blogId)
          

            if(!blog) {
              return  res.status(404).json({error:"Blog not found"})
            }
            res.status(200).json(blog)
       

    } catch (error) {
        res.status(500).json({error:"Server Error"})
    }
    
})

//blogu güncelleme
router.put("/:blogId", async ( req,res)=> {
    try {
        const blogId = req.params.blogId;
        const updates = req.body;
        const existingBlog = await Blog.findById(blogId)

        if(!existingBlog) {
            return  res.status(500).json({error:'Blog not found'})
        }

       const updated =await Blog.findByIdAndUpdate(blogId,updates,{new:true});

       res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({error:'Server Error'})
        
    }
})

// blog silme işlemi
router.delete("/:blogId" , async (req,res)=> {
    try {
        
        const blogId = req.params.blogId;

        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        if(!deletedBlog) {
            return res.status(404).json("blog not found")
        }
        res.status(200).json(deletedBlog)
    } catch (error) {
        res.status(500).json({error:'Server Error'+error})
        
    }
})

module.exports= router;