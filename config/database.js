/**
 * Project: utility-payments
 * Description: Utility Payments middleware for alizz islamic Bank.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */
const Sequelize = require('sequelize');

const config = require('./config');

// * Importing environment variable
require('dotenv').config();

let dbConfig;

if (process.env.NODE_ENV === 'development') {
  dbConfig = config.development;
}
if (process.env.NODE_ENV === 'test') {
  dbConfig = config.test;
}
if (process.env.NODE_ENV === 'production') {
  dbConfig = config.production;
}

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'mysql',
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: true,
      freezeTableName: true,
    },
    logging: false,
  }
);

module.exports = sequelize;
