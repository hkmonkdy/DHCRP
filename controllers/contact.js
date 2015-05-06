var nodemailer = require('nodemailer');

exports.send = function(contactForm, done){
  var message = {
    // sender info
    from: '"' + contactForm.name + '" <' + contactForm.email + '>',

    // Comma separated list of recipients
    to: 'dhcrp.hk@gmail.com',

    // Subject of the message
    subject: '[DHCRP] ' + contactForm.subject,

    headers: {
        'X-Laziness-level': 1000
    },

    // plaintext body
    text: contactForm.content,

    // HTML body
    html: contactForm.content,
  };

  // Create a SMTP transporter object
  var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'dhcrp.hk@gmail.com',
		pass: 'dhcrp-hk'
	}
  });
  
  transporter.sendMail(message, function(error, info) {
    if (error) {
        console.log('Error occurred');
        console.log(error.message);
        return;
    }
  });
}