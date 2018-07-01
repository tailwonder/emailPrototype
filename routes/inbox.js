var express = require('express');
var router = express.Router();

temp=require('emailjs-imap-client')
var Client=temp.default
var user = 'pearl@ua-robotics.net'
var password = 'rolltide'
var server="imap.gmail.com"
var port= 993
config={ auth:{user: user, pass: password } }
var client = new Client(server,port,config)

async function getMessageSubject() {
  try {
    await client.connect()
    console.log("Connected");
  } catch(err) {
    console.log('Ohh no:', err.message);
  }

  const messages= await client.listMessages('INBOX', '1:10', ['uid', 'flags', 'envelope', 'body[]'])
  console.log("loading messages");

  messages.forEach((message) => {console.log('Message subject: '+ message.envelope.subject);  });

  console.log("messages loaded: "+messages.length);
  client.close()
  return messages

}

/* GET home page. */
router.get('/', function(req, res, next) {

  getMessageSubject().then((messages) => {
    res.render('Inboxpage', { messages:  messages, user: user, title:" Inbox to the email " , tab:" Welcome to the inbox " , text: "Lets begin"  });
  }, ()=> {res.render('inbox', { title:  "Connection failed" });}

);


});




module.exports = router;
