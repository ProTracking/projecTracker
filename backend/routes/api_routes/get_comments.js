const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Get all Comments from DB
router.get('/allComments', (req,res) => {
    const sql = "select * from comments";
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

// Get comment with id
router.get('/comment' , ({body},res) => {
    const sql = "select * from comments where id = " + body.comment_id;
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