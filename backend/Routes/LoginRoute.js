

// const { body, validationResult } = require('express-validator');
const express = require('express');

const cors = require("cors");
const bcrypt = require('bcryptjs');
const User = require('../DB/Users');
const Jwt = require('jsonwebtoken');
const router = express.Router();
const SECRET_KEY = 'my_super_secret_key_32_chars__'; // 32-char key
// Login Route
router.post('/login', async (req, resp) => {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
        return resp.status(400).send({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return resp.status(404).send({ message: "User not found" });
        }

        const pwdMatch = await bcrypt.compare(password, user.password);
        if (!pwdMatch) {
            return resp.status(401).send({ message: "Invalid credentials" });
        }

        Jwt.sign({ user }, SECRET_KEY, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                return resp.status(500).send({ message: "Something went wrong" });
            }
            resp.send({ user, auth: token });
        });
    } catch (err) {
        console.error("Login error:", err);
        resp.status(500).send({ message: "Internal server error" });
    }
});
module.exports = router;
