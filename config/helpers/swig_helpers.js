var S = require('string');

var SwigHelpers = {
  setup: function(swig) {
    swig.setDefaults({ cache: false });

    swig.setFilter('truncate', function(data) {
      return S(data.string).truncate(data.at).s;
    });
  }
};

module.exports = SwigHelpers;
