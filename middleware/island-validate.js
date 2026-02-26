const validator = require('../helpers/validate');

const saveIsland = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    country: 'required|string',
    population: 'required|numeric',
    language: 'required|string',
    capital: 'required|string',
    subRegion: 'required|string',
    climate: 'required|string',
    mainIndustries: 'required|string',
    elevation: 'required|numeric'
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
    country: 'string',
    population: 'numeric',
    language: 'string',
    capital: 'string',
    subRegion: 'string',
    climate: 'string',
    mainIndustries: 'array',
    elevation: 'numeric'
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
  saveIsland,
  updateIsland
};
