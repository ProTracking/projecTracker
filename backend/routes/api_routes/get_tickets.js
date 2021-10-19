const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Get all tickets from DB
router.get('/allTickets', (req,res) => {
    const sql = "select * from ticket";
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

// Get tickets with id
router.get('/ticket' , ({body},res) => {
    const sql = "select * from ticket where id = " + body.ticket_id;
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

