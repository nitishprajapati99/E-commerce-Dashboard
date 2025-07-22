const express = require('express');
const Jwt = require('jsonwebtoken');
const User = require('../DB/Users');
const SECRET_KEY = 'my_super_secret_key_32_chars__'; // 32-char key

// ========================
// 🛡️ JWT Middleware
// ========================
const verifyToken = (req, resp, next)=> {
  const tokenHeader = req.headers['authorization'];

  if (tokenHeader) {
    const token = tokenHeader.split(' ')[1];

    Jwt.verify(token,SECRET_KEY , (err, valid) => {
      if (err) {
        return resp.status(403).send({ result: 'Invalid token' });
      } else {
        req.user = valid;
        next();
      }
    });
  } else {
    resp.status(401).send({ result: 'Authorization token missing' });
  }
}
module.exports = verifyToken;