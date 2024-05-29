const express = require("express");

const Logo = require("../models/Logo.js")

const router = express.Router()


//Yeni bir logo oluşturma 
router.post("/",async (req,res)=> {
    try {
        const {img}= req.body;


        const newLogo = new Logo(req.body)
        await newLogo.save()

        res.status(201).json(newLogo)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Server Error"})
    }
})

//Tüm logoları getirme

router.get("/",async(req,res)=> {
    try {
       
     const logo = await Logo.find()
 
     res.status(200).json(logo)
    } catch (error) {
     res.status(500).json({error:"Server Error"})
    }
 })
 

 
//kuponu güncelleme
router.put("/:logoId", async ( req,res)=> {
    try {
        const logoId = req.params.logoId;
        const updates = req.body;
        const existingLogo = await Logo.findById(logoId)

        if(!existingLogo) {
            return  res.status(500).json({error:'Logo not found'})
        }

       const updated =await Logo.findByIdAndUpdate(logoId,updates,{new:true});

       res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({error:'Server Error'})
        
    }
})

// logo silme işlemi
router.delete("/:logoId" , async (req,res)=> {
    try {
        
        const logoId = req.params.logoId;

        const deletedLogo = await Logo.findByIdAndDelete(logoId);

        if(!deletedLogo) {
            return res.status(404).json("logo not found")
        }
        res.status(200).json(deletedLogo)
    } catch (error) {
        res.status(500).json({error:'Server Error'+error})
        
    }
})

module.exports = router