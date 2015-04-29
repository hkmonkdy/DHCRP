exports.step1 = function(req, res){
  res.render('../views/application-employer');
};

exports.step2 = function(req, res){
  res.render('../views/application-helper');
};

exports.step3 = function(req, res){
  res.render('../views/application-document');
};