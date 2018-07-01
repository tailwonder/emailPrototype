var express = require('express');
var router = express.Router();

// ------
router.get('/', function(req, res, next) {
  res.render('Loginpage', {title :"Senior Citizen Mail login", message: "Please Login",text: "Welcome to Senior Citizen Mail Login", text2: "Username" });
});


router.post('/', function (req, res, next) {

  console.log('headers:' + JSON.stringify(req.headers))
  console.log('in login:' + JSON.stringify(req.body))

  // you might like to do a database look-up or something more scalable here
  if (req.body.username && req.body.username === 'user' && req.body.password && req.body.password === 'pass') {
    console.log('auth ok')
    req.session.authenticated = true;
    req.session.save()
    res.redirect('/home');
  } else {
    res.flash('error', 'Username and password are incorrect');
    //req.session.authenticated = false;
    //req.session.save()
    res.redirect('/login');
  }
});

module.exports = router;
