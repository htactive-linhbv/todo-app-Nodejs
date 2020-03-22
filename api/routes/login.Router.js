const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const users = require('../../user.json');
const jwt = require('jsonwebtoken');

const tokenList = {};







router.post("/", (req, res) => {
    const user = users.find(x => x.userName == req.body.user.userName);
    console.log(user);

    console.log(req.body.user.userName)
    if (user) {
        bcrypt.compare(req.body.user.userPass, user.password, function (err, ress) {
            if (ress) {
              const token = jwt.sign(user,'shhhhh');
              res.status(201).json(token);
                console.log("dangnhap thanh cong");
                console.log(token);
                
            } else console('sai tai khoan mk');

        })
    }

    else {
        res.status(401).send("user ko ton tai");
        console.log("user khong ton tai");

    }
})


  


module.exports = router;
