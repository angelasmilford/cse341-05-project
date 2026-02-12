// Module dependencies
const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// const graphqlHTTP = require('express-graphql');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');


// Middleware
app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/', require('./routes'));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));


// Database connection
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.once('open', () => {
  console.log('Connected to database');
});

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
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});