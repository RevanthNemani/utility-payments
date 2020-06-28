/**
 * Project: utility-payments
 * Description: Utility Payments middleware for alizz islamic Bank.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const Info = sequelize.define(
  'billerInfo',
  {
    billerId: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'billers',
        key: 'billerId',
      },
      field: 'billerId',
    },
    Code: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
      field: 'Code',
    },
    StmtBankCode: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'StmtBankCode',
    },
    Website: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'Website',
    },
    Email: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'Email',
    },
    Phone: {
      type: Sequelize.STRING(20),
      allowNull: true,
      field: 'Phone',
    },
  },
  { timestamps: false }
);
const Name = sequelize.define(
  'billerName',
  {
    billerId: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'billers',
        key: 'billerId',
      },
      field: 'billerId',
    },
    EnShortName: {
      type: Sequelize.STRING(255),
      unique: true,
      allowNull: true,
      field: 'EnShortName',
    },
    ArShortName: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'ArShortName',
    },
    EnName: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'EnName',
    },
    ArName: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'ArName',
    },
  },
  { timestamps: false }
);
const Marketing = sequelize.define(
  'billerMarketing',
  {
    billerId: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'billers',
        key: 'billerId',
      },
      field: 'billerId',
    },
    EnLogo: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'EnLogo',
    },
  },
  { timestamps: false }
);
const Category = sequelize.define(
  'billerCategory',
  {
    billerId: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'billers',
        key: 'billerId',
      },
      field: 'billerId',
    },
    EnShortName: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'EnShortName',
    },
    ArShortName: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'ArShortName',
    },
    EnName: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'EnName',
    },
    ArName: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'ArName',
    },
  },
  { timestamps: false }
);

const Biller = sequelize.define('billers', {
  billerId: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'billerId',
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: 1,
    allowNull: false,
    fields: 'active',
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
});

const Services = sequelize.define(
  'billerServices',
  {
    serviceId: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'serviceId',
    },
    billerId: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'billers',
        key: 'billerId',
      },
      field: 'billerId',
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1,
      allowNull: false,
      fields: 'active',
    },
  },
  { timestamps: false }
);
const ServiceInfo = sequelize.define(
  'serviceInfo',
  {
    serviceId: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'billerServices',
        key: 'serviceId',
      },
      field: 'serviceId',
    },
    Code: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: 'Code',
    },
    Type: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: 'Type',
    },
    EnShortDesc: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'EnShortDesc',
    },
    ArShortDesc: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'ArShortDesc',
    },
    EnDesc: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'EnDesc',
    },
    ArDesc: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'ArDesc',
    },
    PaymentType: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: 'PaymentType',
    },
  },
  { timestamps: false }
);
const BillingInfo = sequelize.define(
  'billingInfo',
  {
    serviceId: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'billerServices',
        key: 'serviceId',
      },
      field: 'serviceId',
    },
    EnShortDesc: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: 'EnShortDesc',
    },
    ArShortDesc: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: 'ArShortDesc',
    },
    EnDesc: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: 'EnDesc',
    },
    ArDesc: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: 'ArDesc',
    },
  },
  { timestamps: false }
);

module.exports = {
  Info,
  Name,
  Marketing,
  Category,
  Biller,
  Services,
  ServiceInfo,
  BillingInfo,
};
