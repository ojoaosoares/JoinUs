let mysql = require('mysql2');

let connection = mysql.createConnection({
    host: 'roundhouse.proxy.rlwy.net',
    user: 'root',
    password: 'BdEf2Ah12c422D2fGcbfEaHEh2ggfd-a',
    port: 29563,
    database: 'railway'
});

module.exports = connection;

// Estabilishing a conection with a database from Railray