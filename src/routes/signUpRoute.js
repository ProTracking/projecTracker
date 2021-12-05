require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.post("/signup", ({
    body
}, res) => {
    
    [first_name, last_name, email, password] = Object.values(body);
    const sql = `select * from public.users where email = '${email}';`;

    const promise = new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json({
                    error: err.message,
                });
                return;
            }
            resolve(result.rows[0]);
        });
    });

    promise
        .then((param) => {
            if(typeof param !== 'undefined'){
                res.sendStatus(409);
                throw new Error("User Already Exists");
            };
        })
        .then(() => {

            bcrypt.hash(password, 10, function (err, hash) {
                const insertSQL = `insert into users (username, first_name, last_name, password, email, team_id) values('${email.split("@")[0]}', '${first_name}', '${last_name}', '${hash}', '${email}', 1)`;
                const getUserID = `select id, is_verified from users where email = '${email}';`
                let user_id;
                let is_verified;

                db.query(insertSQL, function (err, result) {
                    if (err) throw err;

                });

                db.query(getUserID, function (err, result) {
                    if (err) throw err;
                    user_id = result.rows[0].id;
                    is_verified = result.rows[0].is_verified;

                    jwt.sign({ 
                        id: user_id, 
                        email: email, 
                        is_verified: is_verified
                    }, 
                        process.env.JWT_SECRET, 
                    {
                        expiresIn: '2d',
                    },
                    (err, token) =>  {
                        if(err){
                            return res.status(500).json({
                                error: err.message,
                            });
                        }

                        res.send({
                            token: token
                        });
                    });
                });
            });

        }).catch(e => console.log(e));

});

module.exports = router;
