exports.step1 = function(req, res){
  res.render('../views/application-employer');
};

exports.step1Next = function(req, res){
  res.render('../views/application-helper');
};

exports.step2Next = function(req, res){
  res.render('../views/application-document');
};

exports.step2Previous = function(req, res){
  res.render('../views/application-employer');
};

exports.step3Next = function(req, res){
  res.render('../views/application-confirmation');
};

exports.step3Previous = function(req, res){
  res.render('../views/application-helper');
};