const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Get all tickets from DB
router.get('/tickets', (req,res) => {
    const sql = "select * from tickets";
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
router.get('/tickets/:id' , (req,res) => {
    const sql = `select * from tickets where id = ${req.params.id}`;
    
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

