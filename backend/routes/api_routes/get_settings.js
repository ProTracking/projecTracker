const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Get all settings from DB
router.get('/settings', (req,res) => {
    const sql = `select * from settings`;
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

// Get setting with id
router.get('/settings/:id' , (req,res) => {
    const sql = `select * from settings where id = ${req.params.id}`;
    
    db.query(sql, (err,rows) => {
        console.log(err)
        if(err) {
            res.status(400).json({
                error: err.message
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

