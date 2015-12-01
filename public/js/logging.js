var Keen = require('keen-js');

var client = new Keen({
  projectId: '565d59e4c1e0ab7bbbca92ce',
  writeKey: '20b4bff87a76e320f4f019ab4b28b8fc642b3dedf9f433c93a2efa3a79b88eba78829b071f68825998df96d6e884eb949c10a38dedd74d80c031fed25610321d7deff0504c28a7962f36d8ea16fdac46ba64816eb3b1d722a8db4216b246888ab0ac66bb7504876eb83507d10d3fe53d',
  readKey: '7a122c2474cc28579de75e29351c44928d3aef80bde46e0c58213d93073861cf9a88bad4aa830510a7ef35a5e48db9e074cafe17337ba6391083cd518f4436b024ea5ea30c10161c510254c38f1fa1b3389df51f196ee8291fd8a1380babfb74fdf1e2988fb52705d5ce38fff034eba6'
});


exports.logTrip = function(trip, cb) {
  client.addEvent('trips', trip, cb);
};

exports.getLeaderboard = function(metric, cb) {
  var query = new Keen.Query('sum', {
    eventCollection: 'trips',
    groupBy: 'startNeighborhood',
    targetProperty: metric,
    timeframe: 'this_365_days',
    timezone: 'UTC'
  });

  client.run(query, cb);
};
