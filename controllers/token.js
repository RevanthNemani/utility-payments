/**
 * Project: utility-payments
 * Description: Utility Payments middleware for alizz islamic Bank.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

// * Importing models
const { Token } = require('../models/token');

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

// GET all tokens /tokens
exports.getTokens = (req, res, next) => {
  Token.findAll()
    .then((tokens) => {
      res.status(200).json(tokens);
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message || 'Some error occurred',
      });
    });
};

// GET a token based on tokenId /token/:tokenId
exports.getToken = (req, res, next) => {
  Token.findByPk(req.params.tokenId)
    .then((token) => {
      res.status(200).json(token);
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message || 'Some error occurred',
      })
    })
}

// POST token /token
exports.postToken = (req, res, next) => {
  const request = req.body;
  Token.create(request)
    .then(() => {
      res.status(201).json({ createdToken: 1 });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ createdToken: 0, reason: err });
    });
}

// PATCH token /token/:tokenId
exports.patchToken = (req, res, next) => {
  Token.update(
    {
      tokenKey: req.body.tokenKey,
      tokenExp: req.body.tokenExp,
      updatedBy: req.body.updatedBy
    },
    {
      where: { tokenId: req.params.tokenId }
    }
  )
    .then(() => {
      res.status(201).json({ updatedToken: 1 });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ updatedToken: 0, reason: err });
    });
}
