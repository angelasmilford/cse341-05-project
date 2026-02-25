// Module dependencies
const express = require('express');
const cors = require('cors');
const app = express();
// const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// const graphqlHTTP = require('express-graphql');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const { MongoDBNamespace } = require('mongodb');

const bodyParser = require('body-parser');
const mongodb = require('./db/connect');


// Middleware
app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/', require('./routes'))
  .use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
})



process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
})



// Database connection
mongodb.initDb((err) => {
  if (err) {
    console.log('Failed to connect to the database', err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to the database successfully!`);
      console.log(`Server is running on port ${port}`);
    });
  }
});

// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI);

// mongoose.connection.once('open', () => {
  // console.log('Connected to database');
// });

// const db = require('./models');
// db.mongoose
  // .connect(db.url, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  // })
  // .then(() => {
    // console.log('Connected to the database!');
  // })
  // .catch((err) => {
    // console.log('Cannot connect to the database!', err);
    // process.exit();
  // });



// Server setup
// app.listen(port, () => {
  // console.log(`Server is running on port ${port}.`);
// });