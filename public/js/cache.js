exports.saveQuery = function(query) {
  sessionStorage.setItem('query', JSON.stringify(query));
};

exports.fetchQuery = function() {
  var query = sessionStorage.getItem('query') || '{}';
  return JSON.parse(query);
};
