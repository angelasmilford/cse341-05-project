const validator = require('../helpers/validate');

const saveTradition = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    islandId: 'require|number',
    description: 'required|string',
    category: 'required|string',
    significance: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveTradition
};
