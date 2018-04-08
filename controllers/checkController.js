// Database Connect
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'medamaoyaji',
  user     : 'itako',
  password : 'itako',
  database : 'medamaoyaji_db'
});


/* ログインしようとしたとき */
exports.index = function(req, res) {
　　
	var getPram = "";
	getPram += req.query.name;
　　
  var sql = 'select * from m_devices order by code';
  var params = {};

  connection.query(sql, params, function (error, results, fields) {
	
	  if(getPram=""){
			res.redirect('/pages/index', { title: 'Itako', data: results });
	  }else{
      res.redirect('/login', { title: 'Itako', data: results });
    }
  
  })
};
