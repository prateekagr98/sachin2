var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  conn.connect(function(err){
  	console.log('Connected to Mysql');
  	conn.query('SELECT * from users;', function (err, result) {
    	if (err) throw err;
    	res.status(200).send({
    		users: result
    	});
  	});
  });
});


router.get('/:id', function(req, res, next) {
	conn.connect(function(err){
		console.log('Connected to Mysql');
		conn.query('SELECT * from users WHERE id=' + req.params.id, function(err, result){
			if(err) throw err;
			res.status(200).send(result);
		})
	});
});

router.post('/', function(req, res, next) {

	let query = 'INSERT INTO users (name, designation, manager) VALUES (' + req.body.name + ',' + req.body.designation + ',' + req.body.manager + ');';

	conn.connect(function(err){
		console.log('Connected to Mysql');
		conn.query(query, function(err, result){
			if(err) throw err;
			res.status(201).send(result);
		});
	});
});

module.exports = router;
