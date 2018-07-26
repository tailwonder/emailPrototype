var express = require('express');
var router = express.Router();

// ------
router.get('/', function(req, res, next) {
  res.render('layout', {title:" layout " , tab:" Welcome to layout " , text: "Inbox"  });
}); 


module.exports = router;