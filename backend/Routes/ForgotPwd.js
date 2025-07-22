
const express = require('express');
const cors = require("cors");
const User = require('../DB/Users');
const router = express.Router();

router.post('/forgotpwd', async (req, resp) => {
  let { email } = req.body;
  console.log(email);


  // try {

  const user = await User.findOne({ email });
  console.log(user);

  if (!user) {

    resp.status(404).send({
      message: 'user is not found'
    })
  } else {
    resp.status(200).send({
      message: 'email id is valid'
    });
  }
})
module.exports = router;