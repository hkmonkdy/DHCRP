var controllerContact = require('../controllers/contact');

exports.index = function(req, res){
  res.render('../views/index');
};

exports.contact = function(req, res){
  var contactForm = {};
  contactForm.name = req.body.name;
  contactForm.email = req.body.email;
  contactForm.subject = req.body.subject;
  contactForm.content = req.body.content;

  controllerContact.send(contactForm);
  res.render('../views/contact');
};

exports.inquiry = function(req, res){
  res.render('../views/inquiry');
};