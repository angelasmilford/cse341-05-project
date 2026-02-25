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

module.exports = {
  saveIsland
};
