const { Client } = require('pg');

const client = new Client({
    user: 'nvuzlquqnxlfxg',
    host: 'ec2-3-229-166-245.compute-1.amazonaws.com',
    database: 'dciebt79kl0pe6',
    password: '026f9855463e27f0e63b1fb5dfc3c23b0bd1913bf35e9da7a168ec1fbd5649f4',
    port: 5432,
});

// client.connect();
module.exports = client;

