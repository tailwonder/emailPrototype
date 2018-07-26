var express = require('express');
var router = express.Router();
var to = require('./to');

temp=require('emailjs-imap-client')
/*
var Client=temp.default
var user = 'pearl@ua-robotics.net'
var password = 'rolltide'
var server="imap.gmail.com"
var port= 993
config={ auth:{user: user, pass: password } }
var client = new Client(server,port,config)
*/
async function getMessageSubject(username) {
/*  try {
    await client.connect()
    console.log("Connected");
  } catch(err) {
    console.log('Ohh no:', err.message);
  }
*/

  [err, messages]= await to(global.Connection[username].listMessages('INBOX', '1:10', ['uid', 'flags', 'envelope', 'body[]', 'bodystructure']))

  console.log("messages loaded: "+messages.length);
  messages.forEach((message) => {console.log('Message subject: '+ message.envelope.subject);  });
  console.log('body:'+JSON.stringify(messages[0]))
  //messages.forEach((message) => {console.log('Message body: '+ message.body);  });
  
  return messages

}

/* GET home page. */
router.get('/', function(req, res, next) {

  console.log("loading messages:"+req.session.username);
  getMessageSubject(req.session.username).then((messages) => {
    res.render('Inboxpage', { messages:  messages, user: req.session.username, title:" Inbox to the email " , tab:" Welcome to the inbox " , text: "Inbox Page"  });
  }, ()=> {res.render('error', { title: "inbox retrieve error"});}

);


});




module.exports = router;







