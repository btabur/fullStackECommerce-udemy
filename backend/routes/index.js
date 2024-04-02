const express = require("express");

const router = express.Router()

// Diğer route dosyalrını içeri aktarıyoruz

const productRoute = require("./products.js")
const categoryRoute = require("./categories.js")
const authRoute = require("./auth.js")
const couponRoute = require("./coupons.js")


//Her rotayı ilgili yol altında kullanıyoruz.

router.use("/categories",categoryRoute)
router.use("/products",productRoute)
router.use("/users",authRoute)
router.use("/coupons",couponRoute)

module.exports= router;