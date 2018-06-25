var express = require('express');
var router = express.Router();

// ------
router.get('/', function(req, res, next) {
  res.render('template', {title :"Senior Citizen Mail Login", message: "Please Login",text: "Welcome to Senior Citizen Mail Login", text2: "Username" });
}); 


router.get('/', function(req, res, next) {
  res.render('template1', {title:" Welcome {Username}", text: "Lets begin"  });
}); 


module.exports = router;