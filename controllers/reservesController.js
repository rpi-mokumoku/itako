var mysql = require('mysql');
var moment = require('moment');

var db_config = {
  host     : 'medamaoyaji',
  user     : 'itako',
  password : 'itako',
  database : 'medamaoyaji_db'
};

//DB接続の処理
var connection;
function handleDisconnect() {
  console.log('INFO.CONNECTION_DB: ');
  connection = mysql.createConnection(db_config);

  //connectionの取得
  connection.connect(function(err) {
    if (err) {
      console.log('ERROR.CONNECTION_DB: ', err);
      setTimeout(handleDisconnect, 1000);
    }
  });

  //connectionLost時の再取得
  connection.on('error', function(err) {
    console.log('ERROR.DB: ', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('ERROR.CONNECTION_LOST: ', err);
      handleDisconnect();
    } else {
      throw err;
    }
  });
}
handleDisconnect();

// controller
exports.index = function(req, res) {

  var sqlNotice = 'select * from t_reserves order by id desc limit 5';
  var sqlMain = 'select * from t_reserves order by room, start_time';
  var params = {};

  var reserveNotices = [];
  var reserveDates = [];
  var reserveDatas = [];

  connection.query(sqlNotice, params, function (error, results, fields) {
    if (error) res.render('error');
    reserveNotices = results;
  })

  connection.query(sqlMain, params, function (error, results, fields) {
    if (error) res.render('error');

    for (reserves of results) {
      reserveDates.push(moment(reserves.date).format("YYYY/MM/DD"));
    }
    reserveDatas = results;

    res.render('index', { title: 'Itako', reserveNotices: reserveNotices,
    reserveDates: reserveDates, reserveDatas: reserveDatas});
  })
};
