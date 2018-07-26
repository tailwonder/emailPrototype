var express = require('express');
var router = express.Router();

// ------
router.get('/', function(req, res, next) {
  res.render('Homepage', {title:" HomePage to the email " , tab:" Welcome you have succeeded in linking the pages " , text: "HOME"});
}); 


module.exports = router;