const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Get all users from DB
router.get('/allUsers', (req,res) => {
    const sql = "select * from users";
    db.query(sql,(err,rows) => {
        if(err) {
            res.status(500).json({
                error:err.message
            });
            return;
        }
        res.json({
            message: 'Success',
            data: rows
        });
    });
});

// Get user with id
router.get('/user' , ({body},res) => {
    const sql = "select * from users where id = " + body.user_id;
    db.query(sql,(err,rows) => {
        if(err) {
            res.status(500).json({
                error:err.message
            });
            return;
        }
        res.json({
            message: 'Success',
            data: rows
        });
    });
});

module.exports = router;