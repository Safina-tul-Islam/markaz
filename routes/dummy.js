var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('pages/bootstrap-template.ejs');
  
});

router.get('/dashboard', function(req, res, next) {
	res.render('pages/dashboard.ejs');
  
});


module.exports = router;
