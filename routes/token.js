/**
 * Project: utility-payments
 * Description: Utility Payments middleware for alizz islamic Bank.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

const express = require('express');

const router = express.Router();

const tokenController = require('../controllers/token');

const isAuth = require('../controllers/auth');

// GET all tokens /tokens
router.get('/tokens', isAuth.headCheck, tokenController.getTokens);

// GET a token based on tokenId /token/:tokenId
router.get('/token/:tokenId', isAuth.headCheck, tokenController.getToken);

// POST token /token
router.post('/token', isAuth.headCheck, tokenController.postToken);

// PATCH token /token/:tokenId
router.patch('/token/:tokenId', isAuth.headCheck, tokenController.patchToken);

module.exports = router;
