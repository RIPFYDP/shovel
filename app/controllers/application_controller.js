var applicationController = {
  index: function(req, res, next) {
    applicationController.resetFlash(req);
    next();
  },

  resetFlash: function(req) {
    req.session.flash = [];
  }
};

module.exports = applicationController;
