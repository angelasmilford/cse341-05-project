const routes = require('express').Router();
const island = require('./island');
const tradition = require('./tradition');

routes.use('/', require('./swagger'));
routes.use('/islands', island);
routes.use('/traditions', tradition);
routes.use(
  '/',
  (docData = (req, res) => {
    let docData = {
      documentationURL: ' ',
    };
    res.send(docData);
  })
);

module.exports = routes;
