const express = require("express");

const router = express.Router()

// Diğer route dosyalrını içeri aktarıyoruz

const productRoute = require("./products.js")
const categoryRoute = require("./categories.js")
const authRoute = require("./auth.js")
const couponRoute = require("./coupons.js")
const userRoute = require("./users.js")
const paymentRoute = require("./payment.js")


//Her rotayı ilgili yol altında kullanıyoruz.

router.use("/categories",categoryRoute)
router.use("/products",productRoute)
router.use("/auth",authRoute)
router.use("/coupons",couponRoute)
router.use("/users",userRoute)
router.use("/payment",paymentRoute)

module.exports= router;