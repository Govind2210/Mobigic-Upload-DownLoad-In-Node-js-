const express = require("express");
const user = require("../model/user");
const { body, validationResult } = require("express-validator");
const router = express.Router();

router.post("/", body("email").isEmail(), body("name"), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "Failed By Validator",
        message: errors.array(),
      });
    } else {
      const userAlreadyExist=await user.find({email:req.body.email});
      if(userAlreadyExist.length===0){
        await user.create({
          email: req.body.email,
          name: req.body.name,
          image: req.body.image,
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Please Add Files",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error,
    });
  }
});

module.exports = router;
