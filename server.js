require('dotenv').config();
require('./config/passport');

// --------------------
// Module dependencies
// ---------------------
const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const session = require('express-session');
const passport = require('passport');

// -----------
// Middleware 
// -----------

app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false
}));

app
  .use(passport.initialize())
  .use(passport.session())
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use('/', require('./routes'));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});


// --------------------------------
process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});


// --------------------
// Database connection
// --------------------
// mongodb.initDb((err) => {
//   if (err) {
//     console.log('Failed to connect to the database', err);
//   } else {
//     app.listen(port, () => {
//       console.log(`Connected to the database successfully!`);
//       console.log(`Server is running on port ${port}`);
//     });
//   }
// });

const initDb = mongodb;

initDb().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(err => {
  console.error('Failed to start server:', err);
});