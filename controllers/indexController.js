
// Database Connect
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'medamaoyaji',
  user     : 'itako',
  password : 'itako'
});

exports.index = function(req, res) {

  connection.query('SELECT 123 as tmp', function (error, results, fields) {
    console.log(results[0].tmp);
    res.render('index', { title: 'Shaman', data: results });
  })
};







