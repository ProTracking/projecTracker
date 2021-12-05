const express = require('express');
const router = express.Router();
const db = require("../db");
const helper = require('./helper.js');

// Create Ticket
router.post('/ticket', ({body}, res) => {
    // truncateTicketTable()
    const sql = `INSERT INTO tickets (subject,content,html,priority,settings_id,project_id,status,user_id)`
                + `VALUES (
                \'${body.subject}\',
                \'${body.content}\',
                \'${body.html}\',
                \'${body.priority}\',
                \'${body.settings_id}\',
                \'${body.project_id}\',
                \'${body.status}\',
                ${body.user_id})`;

    db.query(sql, (err, result) => {
        if(err) {
            res.status(400).json({
                error:err.message
            });
            return;
        }
        res.json({
            message: 'Ticket created successfully!',
            data: body
        });
    });
});

function truncateTicketTable () {
    const truncateTable = `TRUNCATE TABLE tickets CASCADE`;
    db.query(truncateTable, (err, result) => {});
}
// Get all tickets from DB
router.get('/tickets/:id', (req,res) => {

    const sql = `select * from tickets where user_id = ${req.params.id}`;
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

    helper("tickets", { ...req.body }, condition, (result) => {
        res.json({
            message: 'Success',
            data: req.body,
            changes: result
        });
    });

});

module.exports = router;
