require("dotenv").config();
let mysql = require('mysql2');


let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME 
});

module.exports = connection;

// Estabilishing a conection with a database from Railray