/**
 * Project: utility-payments
 * Description: Utility Payments middleware for alizz islamic Bank.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

//Enviroment Check
let SECRET_KEY;

if (process.env.NODE_ENV === 'development') {
  SECRET_KEY = process.env.DEV_SECRET_KEY;
}
if (process.env.NODE_ENV === 'test') {
  SECRET_KEY = process.env.TEST_SECRET_KEY;
}
if (process.env.NODE_ENV === 'production') {
  SECRET_KEY = process.env.PROD_SECRET_KEY;
}

exports.headCheck = (req, res, next) => {
  if (!req.header('x-api-key')) {
    return res.status(400).json({ error: 'secretKeyNeeded' });
  }
  if (req.header('x-api-key') !== SECRET_KEY) {
    return res.status(401).json({ error: 'secretKeyWrong' });
  }
  next();
};
