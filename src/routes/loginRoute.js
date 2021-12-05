const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");


router.post("/login", ({
    body
}, res) => {
    
    [email, password] = Object.values(body);
    const sql = `select * from public.users where email = '${email}';`;
    
    const promise = new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json({
                    error: err.message,
                });
                return;
            };
            if(result.rows.length == 0){
                return res.sendStatus(401);
            };
            resolve(result.rows[0]);
        });
    });

    promise.then((param) =>  {
        
        id = param.id;
        email = param.email;
        is_verified = param.is_verified;

        bcrypt.compare(password, param.password).then(function(isCorrect) {
            if(isCorrect){
                jwt.sign({ id, email, is_verified }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token)=>{
                    if(err) res.sendStatus(500).send({errorMessage: error});
                    res.send({
                        token: token
                    });
                })
            } else {
                res.sendStatus(401);
            };
        });     
    })
});

module.exports = router;