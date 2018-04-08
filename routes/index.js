var express = require('express');
var router = express.Router();

// Require our controllers.
var loginController = require('../controllers/loginController');
// var checkController = require('../controllers/checkController');
var reservesController = require('../controllers/reservesController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//login
router.get('/login', loginController.index);
//checkする
router.post('/login', loginController.index);

// Reserves
router.get('/reserves', reservesController.index);


module.exports = router;
