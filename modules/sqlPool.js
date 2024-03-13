//modules/sqlPool.js
var mysql = require('mysql');
var sqlPool  = mysql.createPool({
    multipleStatements: true,
    host            : '127.0.0.1',
    user            : 'root',
    password        : '1234',
    database        : 'oauth2newdb'
});
module.exports = sqlPool;
