const express = require('express');
const logger = require('morgan');

const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

app.use(fileUpload());

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
const compression = require('compression');

const cors = require('cors');
const corsOption = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['USER-KEY'],
};
app.use(cors(corsOption));
const helmet = require('helmet');
app.use(helmet());

app.use(compression());
const routes = require('./routes');

app.use('/api', routes);
module.exports = app;
