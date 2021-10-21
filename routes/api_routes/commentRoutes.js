const express = require('express');
const router = express.Router();
const db = require('../../db/connection');


// Create Comment
router.post('/comment', ({body}, res) => {
    const sql = `Insert Into comments (content, user_id, ticket_id, html) VALUES ('\'${body.content}\', ${body.user_id}, ${body.ticket_id}, \'${body.html}\')`;

    db.query(sql, (err, result) => {
        if(err) {
            res.status(400).json({
                error:err.message
            });
            return;
        }
        res.json({
            message: 'Success',
            data: body
        });
    });
});


// Get all Comments from DB
router.get('/comments', (req,res) => {
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
router.get('/comment/:id' , (req,res) => {
    const sql = `select * from comments where id = ${req.params.id}`;
    
    db.query(sql, (err,rows) => {
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