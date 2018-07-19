var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'gpt_test'
});


connection.connect();
var data = [];
connection.query('SELECT sys_infra.infrastructure,sys_infra_family.family from sys_infra INNER JOIN sys_infra_family ON sys_infra.infrastructure=sys_infra_family.infrastructure', function (err, rows, fields) {
    data = rows;
});
connection.end()

var bodyParser = require('body-parser')
router.use( bodyParser.json() );       // to support JSON-encoded bodies

/* GET users listing. */
/*router.get('/', function(req, res, next) {
    res.header('Access-Control-Expose-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3333');
    res.header('Access-Control-Allow-Methods', 'HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', true);

    res.json(data);
});*/

router.all('/', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    res.json(req.body.username);
});

module.exports = router;
