const express = require("express");
const files = require("../model/files");
const user = require("../model/user");
const router = express.Router();

router.get("/getFiles/:email", async (req, res) => {
  try {
    let [{ _id }] = await user.find({ email: req.params.email });
    const data = await files.find({ userRef: _id });
    res.status(200).json({
      status: "Sucess",
      message: data,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
});

router.post("/Post/:email", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: "failed",
        message: "No file uploaded",
      });
    } else {
      let file = req.files.file;
      const code=Math.floor(100000000 + Math.random() * 9000000000)+file.name;
      let [{ _id }] = await user.find({ email: req.params.email });
      let data = await files.find({ userRef: _id });

      if (data.length > 0) {
      data = await files.find({ userRef: _id }).updateOne(
        {},
        {
          $push: {
            files: { name: file.name, code:code },
          },
        }
      );
      }else {
        data = await files.create({
          files:{name: file.name, code:code},
          userRef: _id,
        });
      }
      file.mv("./uploads/" + code, (err) => {
        if (err) console.log(err);
        else console.log("File Uploaded");
      });
      console.log(data);
      res.status(200).json({
        status: "Sucess",
        message: "Successfully Uploaded File",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
});



module.exports = router;
