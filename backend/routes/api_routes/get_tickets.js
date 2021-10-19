const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Get all tickets from DB
router.get('/alltickets', (req,res) => {
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
const des_id = '1';
router.get('/ticket' + des_id, (req,res) => {
    const sql = "select * from ticket where id = " + des_id;
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

