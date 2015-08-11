var monk = require('monk');
var db = monk(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/palmsprings');
var trips = db.get('trips');


exports.addTrip = function(trip, cb) {
  trips.insert(trip, cb);
};
