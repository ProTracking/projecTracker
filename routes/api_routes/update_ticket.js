// const express = require('express');
// const router = express.Router();
// const db = require('../../db/connection');
// const helper = require('./helper.js')


// // Update Ticket
// router.put('/ticket/:id', (req, res) => {
    
//     const condition  = `id = ${req.params.id}`;

//     console.log(req.body.table);

//     helper("tickets", { data: req.body.table, schema: req.body.$schema }, condition, (result) => {
//         res.json({
//             message: 'Success',
//             data: req.body,
//             changes: result
//         });
//     });



//     // const params = [req.body.var, req.body.val]

//     // db.query(sql, params,  (err, result) => {
//     //     if (err) {
//     //         res.status(400).json({
//     //             error: err.message
//     //         });
//     //     } else if (!result.affectedRows) {
//     //         res.json({ message: 'Ticket not found' });
//     //     } else {
//     //         res.json({
//     //             message: 'Success',
//     //             data: body,
//     //             changes: result.affectedRows
//     //         });
//     //     }
//     // });
// });

// module.exports = router;
