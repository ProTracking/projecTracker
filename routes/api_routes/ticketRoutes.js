const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const helper = require('./helper.js');

// Create Ticket
router.post('/ticket', ({body}, res) => {
    const sql = `INSERT INTO tickets (subject,content,html,priority,user_id) ` 
                + `VALUES (\'${body.subject}\', \'${body.content}\', \'${body.html}\', \'${body.priority}\', ${body.user_id})`;

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
router.get('/ticket/:id' , (req,res) => {
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


// Update Ticket
router.put('/ticket/:id', (req, res) => {
    const condition  = `id = ${req.params.id}`;
    console.log(req.body.table);
    helper("tickets", { data: req.body.table, schema: req.body.$schema }, condition, (result) => {
        res.json({
            message: 'Success',
            data: req.body,
            changes: result
        });
    });

});

module.exports = router;
