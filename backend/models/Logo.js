const mongoose = require("mongoose");

const LogoShema = mongoose.Schema(
  {
    img: {type: String,required: true},
  },
);

const Logo = mongoose.model("Logo", LogoShema)

module.exports=Logo;