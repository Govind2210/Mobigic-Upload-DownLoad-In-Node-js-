const files = require("../model/files");
const user = require("../model/user");

const verifyUser = async (req, res, next) => {
  const email = req.params.email;
  const code = req.params.name;
  let [{ _id }] = await user.find({ email: email });
  const data = await files.find({ userRef: _id });
  array = data[0].files;
  let isUserValid = false;
  for (let i = 0; i < array.length; i++) {
    if (array[i].code === code) {
      isUserValid = true;
    }
  }
  if (isUserValid) {
    next();
  } else {
    res.status(500).json({
      status: "Failed",
      message: "UnAuthorized User",
    });
  }
};
module.exports = verifyUser;
