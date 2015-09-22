exports.getLeaders = function(cb) {
  var results = [
    {
      neighborhood: 'Andreas Hills',
      co2: 100,
      calories: 99000
    },
    {
      neighborhood: 'Araby Commons',
      co2: 99,
      calories: 95000
    },
    {
      neighborhood: 'Araby Cove',
      co2: 98,
      calories: 90000
    },
    {
      neighborhood: 'Baristo',
      co2: 97,
      calories: 87000
    },
    {
      neighborhood: 'Canyon Corridor',
      co2: 96,
      calories: 83000
    },
    {
      neighborhood: 'Deepwell Estates',
      co2: 95,
      calories: 76000
    },
    {
      neighborhood: 'Demuth Park ',
      co2: 94,
      calories: 70000
    },
    {
      neighborhood: 'Desert Highland',
      co2: 93,
      calories: 65000
    },
    {
      neighborhood: 'Desert Park Estates',
      co2: 92,
      calories: 61000
    },
    {
      neighborhood: 'El Mirador',
      co2: 91,
      calories: 56000
    },
    {
      neighborhood: 'El Rancho Vista',
      co2: 90,
      calories: 50000
    },
    {
      neighborhood: 'Four Seasons',
      co2: 89,
      calories: 45000
    },
    {
      neighborhood: 'Historic Tennis Club',
      co2: 88,
      calories: 39000
    }
  ];

  cb(null, results);
};
