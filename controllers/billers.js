/**
 * Project: utility-payments
 * Description: Utility Payments middleware for alizz islamic Bank.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

// CRUD for breed and images

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
} = require('../models/billers');

//Enviroment Check
let SERVER_TYPE;
let SERVER_NAME;
let PROXY_PORT;

if (process.env.NODE_ENV === 'development') {
  SERVER_TYPE = process.env.DEV_SERVER_TYPE;
  SERVER_NAME = process.env.DEV_SERVER_NAME;
  PROXY_PORT = process.env.DEV_PROXY_PORT;
}
if (process.env.NODE_ENV === 'test') {
  SERVER_TYPE = process.env.TEST_SERVER_TYPE;
  SERVER_NAME = process.env.TEST_SERVER_NAME;
  PROXY_PORT = process.env.TEST_PROXY_PORT;
}
if (process.env.NODE_ENV === 'production') {
  SERVER_TYPE = process.env.PROD_SERVER_TYPE;
  SERVER_NAME = process.env.PROD_SERVER_NAME;
  PROXY_PORT = process.env.PROD_PROXY_PORT;
}

// GET get all billers /list-billers
exports.getAllBillers = (req, res, next) => {
  res.status(200).json({ success: 'ok' });
};
