var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req,res,next){
  res.render('pages/app.ejs',{route:"login"});
})

router.get('/register', function(req,res,next){
  res.render('pages/app.ejs',{route:"register"});
});


module.exports = router;
