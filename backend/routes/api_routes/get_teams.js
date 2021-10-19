const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Get all teams from DB
router.get('/allTeams', (req,res) => {
    const sql = "select * from team";
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
router.get('/team' , ({body},res) => {
    const sql = "select * from team where id = " + body.team_id;
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