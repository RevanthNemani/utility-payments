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

// GET get all active billers /list-billers
router.get('/billers/active', billersController.getActiveBillers);

// GET get all active billers /billers
router.get('/billers', isAuth.headCheck, billersController.getAllBillers);

// POST billers /billers
router.post('/billers', isAuth.headCheck, billersController.postBillers);

module.exports = router;
