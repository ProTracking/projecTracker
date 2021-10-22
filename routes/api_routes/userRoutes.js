const express = require('express');
const router = express.Router();
const db = require('../../db/connection');


// Create User
router.post('/user', ({body}, res) => {
    const sql = `Insert Into users (username, password, email, team_id) ` 
                + `VALUES (\'${body.username}\',\'${body.password}\',\'${body.email }\',${body.team_id})`;

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

// Get all users from DB
router.get('/users', (req,res) => {
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
router.get('/user/:id' , (req,res) => {
    const sql = `select * from users where id = ${req.params.id}`;
    
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