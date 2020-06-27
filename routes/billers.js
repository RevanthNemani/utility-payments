/**
 * Project: utility-payments
 * Description: Utility Payments middleware for alizz islamic Bank.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

const express = require('express');

const router = express.Router();

const billersController = require('../controllers/billers');

const isAuth = require('../controllers/auth');

// GET get all billers /list-billers
router.get('/list-billers', billersController.getAllBillers);

module.exports = router;
