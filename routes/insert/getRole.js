var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'gpt_test'
});

var data = [];

connection.connect();
connection.query('SELECT * FROM sys_role', function (err, rows, fields) {
    data = rows;
});
connection.end()


/* GET users listing. */
router.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(data);
});

module.exports = router;
