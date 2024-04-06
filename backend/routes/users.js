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


 module.exports=router