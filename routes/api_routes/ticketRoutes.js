const express = require('express');
const router = express.Router();
const db = require('../../db/connection');


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


router.put('/ticket/:id', (req, res) => {
    const sql = 'UPDATE ticket SET ' +
        + req.body.id + ' = ' + body.val
        + 'WHERE ';
    const params = [req.body.var, req.body.val]

    db.query(sql, params,  (err, result) => {
        if (err) {
            res.status(400).json({
                error: err.message
            });
        } else if (!result.affectedRows) {
            res.json({ message: 'Ticket not found' });
        } else {
            res.json({
                message: 'Success',
                data: body,
                changes: result.affectedRows
            });
        }
    });
});

module.exports = router;
