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
  Info,
  Name,
  Marketing,
  Category,
  Biller,
  Services,
  ServiceInfo,
  BillingInfo,
} = require('./models/billers');

const { Token } = require('./models/token');

// * Importing routers
const billersRoute = require('./routes/billers');
const tokenRoute = require('./routes/token');

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

// * Biller Route
app.use(billersRoute);

// * Token Route
app.use(tokenRoute);

// * Error Route
app.use(errorController.get404);

// * Defining SQL relationships

// Biller to Name
Biller.hasOne(Name, {
  constraints: true,
  onDelete: 'CASCADE',
  as: 'BillerName',
  key: 'billerId',
  foreignKey: 'billerId',
});
// Name to Biller
Name.belongsTo(Biller, {
  as: 'BillerName',
  key: 'billerId',
  foreignKey: 'billerId',
});

// Biller to Info
Biller.hasOne(Info, {
  constraints: true,
  onDelete: 'CASCADE',
  as: 'BillerInfo',
  key: 'billerId',
  foreignKey: 'billerId',
});
// Info to Biller
Info.belongsTo(Biller, {
  as: 'BillerInfo',
  key: 'billerId',
  foreignKey: 'billerId',
});

// Biller to Marketing
Biller.hasOne(Marketing, {
  constraints: true,
  onDelete: 'CASCADE',
  as: 'BillerMarketing',
  key: 'billerId',
  foreignKey: 'billerId',
});
// Marketing to Biller
Marketing.belongsTo(Biller, {
  as: 'BillerMarketing',
  key: 'billerId',
  foreignKey: 'billerId',
});

// Biller to Category
Biller.hasOne(Category, {
  constraints: true,
  onDelete: 'CASCADE',
  as: 'BillerCategory',
  key: 'billerId',
  foreignKey: 'billerId',
});
// Category to Biller
Category.belongsTo(Biller, {
  as: 'BillerCategory',
  key: 'billerId',
  foreignKey: 'billerId',
});

// Biller to Services
Biller.hasMany(Services, {
  constraints: true,
  onDelete: 'CASCADE',
  as: 'BillerServices',
  key: 'billerId',
  foreignKey: 'billerId',
});
// Services to Biller
Services.belongsTo(Biller, {
  as: 'BillerServices',
  key: 'billerId',
  foreignKey: 'billerId',
});

// Services to ServiceInfo
Services.hasOne(ServiceInfo, {
  constraints: true,
  onDelete: 'CASCADE',
  as: 'ServiceInfo',
  key: 'serviceId',
  foreignKey: 'serviceId',
});
// ServiceInfo to Services
ServiceInfo.belongsTo(Services, {
  as: 'ServiceInfo',
  key: 'serviceId',
  foreignKey: 'serviceId',
});

// Services to BillingInfo
Services.hasOne(BillingInfo, {
  constraints: true,
  onDelete: 'CASCADE',
  as: 'BillingInfo',
  key: 'serviceId',
  foreignKey: 'serviceId',
});
// BillingInfo to Services
BillingInfo.belongsTo(Services, {
  as: 'BillingInfo',
  key: 'serviceId',
  foreignKey: 'serviceId',
});

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
