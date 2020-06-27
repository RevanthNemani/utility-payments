/**
 * Project: utility-payments
 * Description: Utility Payments middleware for alizz islamic Bank.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

// * Importing packages
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

// * Importing environment variable
require('dotenv').config();

let HOST;
let PORT;
if (process.env.NODE_ENV === 'development') {
  HOST = process.env.DEV_APP_HOST;
  PORT = process.env.DEV_APP_PORT;
}
if (process.env.NODE_ENV === 'test') {
  HOST = process.env.TEST_APP_HOST;
  PORT = process.env.TEST_APP_PORT;
}
if (process.env.NODE_ENV === 'production') {
  HOST = process.env.PROD_APP_HOST;
  PORT = process.env.PROD_APP_PORT;
}

// * Importing database config
const sequelize = require('./config/database');

// * Importing models
const {
  BillerInfo,
  BillerName,
  BillerMarketing,
  BillerCategory,
  Billers,
  BillerServices,
  ServiceInfo,
  BillingInfo,
} = require('./models/billers');

// * Importing routers
const billersRoute = require('./routes/billers');

// * importing controllers
const errorController = require('./controllers/error');

// * Initializing express app
const app = express();

// * Helmet to protect against well known vulnerabilities by setting appropriate HTTP headers
app.use(helmet());

// * getting real source IP address
app.set('trust proxy', true);

// * Logging middleware
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// * CORS headers setter
app.use(cors());

// * Compress all routes
app.use(compression());

// * express body-parser settings
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// * Billers Route
app.use(billersRoute);

// * Error Route
app.use(errorController.get404);

// * Defining SQL relationships

// * Initialize sequelize and start service
sequelize
  .sync({ force: process.env.RECREATE_DB })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server listening on http://${HOST}:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
