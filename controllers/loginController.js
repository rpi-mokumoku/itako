// Database Connect
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'medamaoyaji',
  user     : 'itako',
  password : 'itako',
  database : 'medamaoyaji_db'
});

// controller
/* 表示したとき */
exports.index = function(req, res) {
　　
  var getPramName = "";
	var getPramPass = "";
  // getPramName += req.query.name;
  // getPramPass += req.query.pass;
  getPramName += req.body.email;
	getPramPass += req.body.password;

  if(getPramName != "undefined"){  
  //POSTを受け取った時（ログインをしようとしたとき）
　　
    var sql = 'SELECT count(*) AS isAccount FROM m_user_account';
    // var sql = 'SELECT count(*) AS isAccount FROM m_user_account WHERE name = :id AND :pass = ?';
    // var sql = 'SELECT count(*) AS isAccount FROM m_user_account';
    // var sql = 'select * from m_devices where code like :word or name like :word or inet_ntoa(ip_address) like :word or description like :word order by code';
    // var params = {word: "%" + "%"};

    var params = {
      // id:getPramName
      // pass:getPramPass
    };
    // var params = {
    //   "111",
    //   "1111"
    // };

   //  connection.query(sql, params, function (error, results, fields) {

  	// if (error){
   //    res.render('error');
   //  }
   //  res.render('login', { title: 'Itako', myParam: getPramName });      

   //  if(results.isAccount == 1){
   //    // console.log(results);
   //    res.render('login', { title: 'Itako', myParam: getPramName, error: results+"ログインしました" });
   //    // res.render('pages/index', { title: 'Itako', myParam: getPramName });      
   //  }else
   //    res.render('login', { title: 'Itako', myParam: getPramName, error: results[0].isAccount+"~"+JSON.stringify(results)+"id or pass is defined!" });
   //  })


    connection.query({
      sql: 
        // 'SELECT count(*) AS isAccount FROM m_user_account;',
        "SELECT count(*) AS isAccount FROM m_user_account WHERE name = ? and pass = ?;",
      values: [
        getPramName,
        getPramPass,
      ],
    }, function (error, results, fields) {
      console.log(getPramName+":"+getPramPass);
      if(results[0].isAccount == 1){
        //ログインできていた場合
        // res.render('login', { title: 'Itako', myParam: getPramName, error: results+"ログインしました" });
        // res.render('pages/index', { title: 'Itako', myParam: getPramName });
        res.redirect('/reserves');
      }else
      //ログインできていなかった場合
        res.render('login', { title: 'Itako', myParam: getPramName, error: "idかpassが違うようです。" });
      }
    )
  }else{

    /* 最初ログイン画面に遷移してきた場合 */
    res.render('login', { title: 'Itako', myParam: getPramName , error: "" });
  }

};

