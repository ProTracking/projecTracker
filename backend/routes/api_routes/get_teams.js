const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Get all teams from DB
router.get('/teams', (req,res) => {
    const sql = "select * from teams";
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

// Get team with id
router.get('/teams/:id' , (req,res) => {
    const sql = `select * from teams where id = ${req.params.id}`;
    
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