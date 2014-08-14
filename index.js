var parser = require('apis-parser');

module.exports = function(app,prefix){
	var weather = require('is-weather');

  app.get(prefix + '/info', function (req, res) {
    parser(res)(function (cb) {
      cb(null, {
        info: "This is an api for Icelandic weather reports and observations",
        endpoints: {
          forecasts: "/weather/forecasts/",
          observations: "/weather/observations/",
          texts: "/weather/texts/"
        },
        other: {
          availableStations: "/weather/getAvailableStations"
        }
      });
    });
  });

	app.get(prefix + '/forecasts', function(req, res){
		parser(res)(function(cb){

			weather.forecasts({
        lang: req.query.lang,
        stations: req.query.stations,
        descriptions: req.query.descriptions
      }, cb);
		});
	});

	app.get(prefix + '/observations', function(req, res){
		parser(res)(function(cb){

			weather.observations({
        lang: req.query.lang,
        stations: req.query.stations,
        descriptions: req.query.descriptions,
        time: req.query.time,
        anytime: req.query.anytime,
      }, cb);
		});
	});

	app.get(prefix + '/texts', function(req, res){
		parser(res)(function(cb){

			weather.texts({
        lang: req.query.lang,
        types: req.query.types
      }, cb);
		});
	});

	app.get(prefix + '/getAvailableStations', function(req, res){
		parser(res)(function(cb){
      
			weather.availableStations(cb);
		});
	});
}
