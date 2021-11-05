const express = require('express');
const router = express.Router();
const db = require('../../db/connection');


// Create Project
router.post('/project', ({body}, res) => {
    const sql = `Insert Into projects (name) VALUES (\'${body.content}\')`;
    
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


// Get all Projects from DB
router.get('/projects', (req,res) => {
    const sql = "select * from projects";
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

// Get project with id
router.get('/project/:id' , (req,res) => {
    const sql = `select * from projects where id = ${req.params.id}`;
    
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