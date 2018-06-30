var express = require('express');
var router = express.Router();

// ------
router.get('/', function(req, res, next) {
  res.render('Inboxpage', {title:" Inbox to the email " , tab:" Welcome to the inbox " , text: "Lets begin"  });
}); 


module.exports = router;