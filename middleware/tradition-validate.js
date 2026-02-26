const validator = require('../helpers/validate');

const saveTradition = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    islandId: 'required|numeric',
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

const updateIsland = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Data to update cannot be empty!" });
  }

  const validationRule = {
    name: 'string',
    islandId: 'numeric',
    description: 'string',
    category: 'string',
    significance: 'string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if(!status) {
      return res.status(412).json({
        success: false,
        message: 'Validation field',
        data: err
      })
    }
    next();
  })
}

module.exports = {
  saveTradition
};
