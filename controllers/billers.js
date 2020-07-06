/**
 * Project: utility-payments
 * Description: Utility Payments middleware for alizz islamic Bank.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

// CRUD for breed and images

// * Importing models
const {
  Info,
  Name,
  Marketing,
  Category,
  Biller,
  Services,
  ServiceInfo,
  BillingInfo,
} = require('../models/billers');
const sequelize = require('../config/database');

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

// GET get all active billers /billers/active
exports.getActiveBillers = (req, res, next) => {
  Biller.findAll({
    attributes: ['billerId', 'billerCif'],
    include: [
      {
        model: Info,
        as: 'BillerInfo',
        attributes: ['Code', 'StmtBankCode', 'Website', 'Email', 'Phone'],
      },
      {
        model: Name,
        as: 'BillerName',
        attributes: ['EnShortName', 'ArShortName', 'EnName', 'ArName'],
      },
      {
        model: Marketing,
        as: 'BillerMarketing',
        attributes: ['EnLogo'],
      },
      {
        model: Category,
        as: 'BillerCategory',
        attributes: ['EnShortName', 'ArShortName', 'EnName', 'ArName'],
      },
      {
        model: Services,
        where: { active: '1' },
        as: 'BillerServices',
        attributes: ['serviceId', 'fcProdCode'],
        include: [
          {
            model: ServiceInfo,
            as: 'ServiceInfo',
            attributes: [
              'Code',
              'Type',
              'EnShortDesc',
              'ArShortDesc',
              'EnDesc',
              'ArDesc',
              'PaymentType',
            ],
          },
          {
            model: BillingInfo,
            as: 'BillingInfo',
            attributes: ['EnShortDesc', 'ArShortDesc', 'EnDesc', 'ArDesc'],
          },
        ],
      },
    ],
    where: { active: '1' },
  })
    .then((breeds) => {
      res
        .status(200)
        .json({ RecCount: breeds.length.toString(), BillersRec: breeds });
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message || 'Some error occurred',
      });
    });
};

// GET get all active billers /billers
exports.getAllBillers = (req, res, next) => {
  Biller.findAll({
    include: [{ all: true, nested: true }],
  })
    .then((breeds) => {
      res
        .status(200)
        .json({ RecCount: breeds.length.toString(), BillersRec: breeds });
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message || 'Some error occurred',
      });
    });
};

// POST Insert billers /billers
exports.postBillers = (req, res, next) => {
  const billersRec = req.body.BillersRec;
  Biller.destroy({ where: {} }).then(() => {
    Biller.bulkCreate(billersRec, {
      include: [{ all: true, nested: true }],
    })
      .then(() => {
        res.status(200).json({ success: 1 });
      })
      .catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError') {
          res.status(400).json({
            success: 0,
            message: 'some billers are duplicates or already exist',
          });
        } else {
          res.status(400).json({
            success: 0,
            message: err || 'Some error occurred',
          });
        }
      });
  });
};
