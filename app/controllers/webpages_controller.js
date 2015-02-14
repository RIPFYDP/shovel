var webpagesController = {
  index: function(req, res, next) {
    res.render('webpages/index');
  },

  new: function(req, res, next) {
    res.render('webpages/new');
  }
};

module.exports = webpagesController;
