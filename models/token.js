/**
 * Project: utility-payments
 * Description: Utility Payments middleware for alizz islamic Bank.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const Token = sequelize.define('token', {
  tokenId: {
    type: Sequelize.INTEGER(3).UNSIGNED,
    allowNull: false,
    primaryKey: true,
    field: 'tokenId',
    autoIncrement: true,
  },
  tokenKey: {
    type: Sequelize.STRING(255),
    allowNull: false,
    unique: false,
    field: 'tokenKey',
  },
  systemName: {
    type: Sequelize.STRING(45),
    allowNull: false,
    unique: true,
    field: 'systemName',
  },
  tokenExp: {
    type: 'TIMESTAMP NOT NULL',
    allowNull: false,
    field: 'tokenExp',
  },
  createdAt: {
    type: 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP',
    allowNull: true,
    field: 'createdAt',
  },
  updatedAt: {
    type:
      'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    allowNull: true,
    field: 'updatedAt',
  },
  createdBy: {
    type: Sequelize.STRING(45),
    allowNull: false,
    unique: false,
    field: 'createdBy',
  },
  updatedBy: {
    type: Sequelize.STRING(45),
    allowNull: false,
    unique: false,
    field: 'updatedBy',
  },
});

module.exports = { Token };
