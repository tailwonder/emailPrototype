var express = require('express');
var router = express.Router();

// ------
router.get('/', function(req, res, next) {
  res.render('Sentpage', {title:" Send an Email " , tab:" Welcome to the inbox " , text: "Sent Box Page"  });
}); 


module.exports = router;