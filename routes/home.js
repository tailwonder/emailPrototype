var express = require('express');
var router = express.Router();

// ------
router.get('/', function(req, res, next) {
  res.render('Homepage', {title:" Welcome you have succeeded in linking the pages " , text: "Lets begin"  });
}); 


module.exports = router;