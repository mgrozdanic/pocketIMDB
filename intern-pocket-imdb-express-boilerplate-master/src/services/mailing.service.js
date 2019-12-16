var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pocket.imdb@gmail.com',
    pass: 'p0ck3t1mdB'
  }
});

const sendMail = (recipient, code) => {
    
    var mailOptions = {
        from: 'pocket.imdb@gmail.com',
        to: recipient,
        subject: 'Pocket IMDB verification',
        text: 'Your verification code is: ' + code + ' .'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports = {sendMail}