'use strict';

const apm = require('elastic-apm-node').start(
  {
    serviceName: 'api-gw',
    secretToken: '',
    serverUrl: process.env.APM_URL || 'http://localhost:8200',
  },
);

const express = require('express');
//const mongoose = require('mongoose');
const bodyParser = require('body-parser');
/*const dbConfig = require('./config/db.js');
const usersRouter = require('./routes/api/users.js');
const postsRouter = require('./routes/api/posts.js');
const profileRouter = require('./routes/api/profile.js');
*/
const morgan = require('morgan');

const { name, version } = require('./package.json');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));


/*
// connect to mongod
mongoose.connect(dbConfig.uri)
  .then(() => {
    console.log('Connected to mongo db');
  })
  .catch((err) => {
    console.log(`Caught error connecting to mongod: ${err}`);
  });
*/

app.get('/', (req, res) => {
  const d = new Date();
  res.send(`[ d: ${d}] ${req.method} from: ${req.ip}`);
});

/*
app.use('/oauth/auth', authRouter);
app.use('/oauth/token', tokenRouter);
app.use('/api/profile', profileRouter);
*/

const port = process.env.PORT || 6000;

app.listen(port, () => {
  console.log(`APP: ${name} v${version} listening on port ${port}...`);
});
