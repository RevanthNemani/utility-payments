/**
 * Project: utility-payments
 * Description: Utility Payments middleware for alizz islamic Bank.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

exports.get404 = (req, res, next) => {
  console.log(req);
  res.status(404).json('not found');
};
