const express = require("express");
const db = require("./db/connection")
const PORT = process.env.port || 3001;


const app = express(); // Instantiating Express Server
app.use(express.urlencoded({extended:false})); // Express Middleware
app.use(express.json()); // Express Middleware

// Default Response
app.use((req,res) => {
    res.status(404).end()
})

// Connect to Database Server
db.connect();
db.query('SELECT NOW()', (err, res) => {

    if (err) throw err;
    console.log('Database Connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

    db.end()
});



