const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
// const decryptUser = require('../utils/decryptUser'); // your custom decrypt function

router.post('/updatepwd/:email', async (req, resp) => {
  let { password } = req.body;
  const email = req.params.email;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  password = hashedPassword;
  console.log(password);
  try {
    if (!password) {
      resp.status(404).send({
        message: 'password not rech to the backend'
      })
    } else {
      const result = await User.updateOne(
        { email: req.params.email },
        { $set: { password } }

      )
      resp.status(200).send(result);
    }
  }
  catch (err) {
    console.log('The error is', err);
    resp.status(400).send({
      message: 'Some Technical error'
    })
  }
})

module.exports = router;