const express = require("express");

const router = express.Router()

// Diğer route dosyalrını içeri aktarıyoruz

const productRoute = require("./products.js")
const categoryRoute = require("./categories.js")
const authRoute = require("./auth.js")


//Her rotayı ilgili yol altında kullanıyoruz.

router.use("/categories",categoryRoute)
router.use("/products",productRoute)
router.use("/users",authRoute)

module.exports= router;