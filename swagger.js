const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',              // by default: 'REST API'
        description: 'Pacific Islands API'         // by default: ''
    },
    servers: [
        {
            url: 'http://localhost:3000',   // by default: 'http://localhost:3000'
            description: 'Local server'     // by default: ''
        }
    ],
    host: 'localhost:3000',   // by default: 'localhost:3000'
    schemes: ['http'],              // by default: ['http']
};

const outputFile = './swagger.json';
const routes = [ './routes/island.js', './routes/tradition.js']; // './routes/index.js

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(
    outputFile, // <string>
    routes, // <string[]>
    doc // <object> => Promise <any>
);

// swaggerAutogen(outputFile, routes, doc).then(() => {
  // require('./index.js'); // Your project's root file
// });