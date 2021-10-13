const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'randomPassword',
    port: 5432,
});

// client.connect();
module.exports = client;

