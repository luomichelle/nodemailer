const express = require('express')
var path = require('path')
var bparser = require('body-parser')
var nodeMail = require('nodemailer')

var app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// Middleware
app.use(bparser.json())
app.use(bparser.urlencoded({extented: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req,res) {
  res.render('index',{title: 'Computer not working?'})
})

app.get('/about', function(req,res) {
  res.render('about')
})

app.get('/contact', function(req,res) {
  res.render('contact')
})

app.post('/contact/send', function(req,res) {
  var transporter = nodeMail.createTransport({
    service: 'Gmail',
    auth: {
      user: 'keltheceo@hotmail.com',
      pass: 'emperorkel'
    }
  })

  var mailOptions = {
    from:     'kel <keltheceo@hotmail.com>',
    to:       'keltheceo@gmail.com',
    subject:  'Website submission',
    text:     'you have a submission with the following... Name: '+req.body.name+'Email:'+req.body.email+'Message: '+req.body.message,
    html:     '<p>you have a submission with the following...</p><ul><li>Name:'+req.body.name+'</li><li>Email:'+req.body.email+'<li>Message:'+req.body.message+'</li></li></ul>'
  }

  transporter.sendMail(mailOptions, function(err,info) {
    if(err) {
      console.log(err)
      res.redirect('/')
    }else {
      console.log('Message send'+info.respone)
      res.redirect('/')
    }
  })
})

app.listen(3000)
console.log('Server running on 3000')
