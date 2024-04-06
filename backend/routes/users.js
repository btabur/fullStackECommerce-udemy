const express = require("express");

const User = require("../models/User.js")

const router = express.Router()


//Tüm kullanıcıları getirme

router.get("/",async(req,res)=> {
    try {
     const users = await User.find()
 
     res.status(200).json(users)
    } catch (error) {
        console.log(error)
     res.status(500).json({error:"Server Error"})
    }
 })

 // user silme işlemi
router.delete("/:email" , async (req,res)=> {
    try {
        
        const email = req.params.email;

        const deletedUser = await User.findOneAndDelete({email});

        if(!deletedUser) {
            return res.status(404).json("user not found")
        }
        res.status(200).json(deletedUser)
    } catch (error) {
        res.status(500).json({error:'Server Error'+error})
        
    }
})



 module.exports=router