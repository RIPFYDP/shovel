var environment = {};
var development = require('../environments/development');
var test = require('../environments/test');

environment = {
  init: function(app) {
    environment.development = development;
    environment.test = test;

    switch (app.get('env')) {
      case 'development':
        environment.current = development;
        break;
      case 'test':
        environment.current = test;
        break;
      default:
        environment.current = development;
    }

    environment.current.init(app);
  }
};



module.exports = environment;
