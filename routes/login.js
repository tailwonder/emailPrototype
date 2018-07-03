var express = require('express');
var router = express.Router();
temp=require('emailjs-imap-client')
Client=temp.default

async function connectImap(username, password, address, port, tls) {

  if (username in global.Connection) {//&&
      //typeof Connection[username]._connectionReady      == true        &&
      //Connection[username].state              == 'authenticated'  &&
      //Connection[username]._config.user       == username         &&
      //Connection[username]._config.password   == password) {


      console.log('IMAP-CLIENT-USE-AUTHENTICATED-CONNECTION ' + username);

  } else {

      port = port || 993;
      tls = tls || true;
      address = address || "imap.gmail.com";


      config={ auth:{user: username, pass: password } }
      global.Connection[username] = new Client(address,port,config)

      try {
        await global.Connection[username].connect()
        console.log('IMAP-CLIENT-CONNECTED : ' + username);
      } catch(err) {
        console.log('Connection failure:', err.message);return false;
      }
	global.Connection[username].onerror = function(error){console.log("Error:"+error)}

  }
  return true;
}

// ------
router.get('/', function(req, res, next) {
  res.render('Loginpage', {title :"Senior Citizen Mail login", message: "Please Login",text: "Welcome to Senior Citizen Mail Login", text2: "Username" });
});


router.post('/', function (req, res, next) {

  console.log('headers:' + JSON.stringify(req.headers))
  console.log('in login:' + JSON.stringify(req.body))
  console.log('in login:' + JSON.stringify(req.session))
  
  if (req.body.username && req.body.password )
    connectImap(req.body.username,req.body.password)

  console.log("conx:"+global.Connection[req.body.username])
  // you might like to do a database look-up or something more scalable here
//  if (req.body.username && req.body.username === 'user' && req.body.password && req.body.password === 'pass') {
if (global.Connection[req.body.username]!= undefined) {
    console.log('auth ok')
    req.session.authenticated = true;
    req.session.username=req.body.username
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
