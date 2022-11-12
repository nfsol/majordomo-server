const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer({ dest: "uploads/" });

const auth = require("../middleware/auth");
const Product = require("../models/Product");

router.get("/:id", auth, async(req, res) => {
    await Product.findOne({upc:req.params.id}).then((upc) => {
        res.json({
            message:"Query successful",
            upc: upc ? upc : ""
        })
    })
    
  });

  router.post("/new", auth, upload.single("image"), async(req,res) => {
    console.log(req.body)
    res.json({
        message:"success"
    })
  })

module.exports = router;
