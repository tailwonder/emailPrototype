var express = require('express');
var router = express.Router();

// ------
router.get('/', function(req, res, next) {
  res.render('template', {title :"Senior Citizen Mail login", message: "Please Login",text: "Welcome to Senior Citizen Mail Login", text2: "Username" });
}); 


module.exports = router;
