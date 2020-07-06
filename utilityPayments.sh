
# wget -O utility-payments.tar.gz 'https://github.com/RevanthNemani/utility-payments/archive/v0.1.2.tar.gz'
#tar -xzf utility-payments.tar.gz

sudo echo '
########################################################################
## Project: utility-payments                                          ##
## Description: Utility Payments middleware for alizz islamic Bank.   ##
## Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.        ##
## Author: Revanth Nemani <revanth.nemani@alizzislamic.com>           ##
########################################################################
#
# Node environment variable. Options: [development | test | production]
NODE_ENV=production
# Enable it only when needed. Not advisable in production scenario.
# WARNING: This will recreate all tables. You will lose your data.
#RECREATE_DB=1
#
# Development Environment Variables
#
# Development Database setup
DEV_DB_USERNAME=utility-payments
DEV_DB_PASSWORD=utility@2020
DEV_DB_DATABASE=utilityPayment
DEV_DB_HOST=localhost
DEV_DB_PORT=3306
# Development server setup
DEV_APP_HOST=localhost
DEV_APP_PORT=3000
# Devlopment Reverse proxy information
DEV_SERVER_TYPE=http
DEV_SERVER_NAME=localhost
DEV_PROXY_PORT=3000
# Development x-api-key required for admin operations
DEV_SECRET_KEY=iz5o853a5pqSNjRtqg89XyBiK6kY
#
# Test Environment Variables
#
# Test Database setup
TEST_DB_USERNAME=utility-payments
TEST_DB_PASSWORD=Utility@2020
TEST_DB_DATABASE=utilityPayment
TEST_DB_HOST=localhost
TEST_DB_PORT=3306
# Test server setup
TEST_APP_HOST=localhost
TEST_APP_PORT=3004
# Test Reverse proxy information
TEST_SERVER_TYPE=http
TEST_SERVER_NAME=localhost
TEST_PROXY_PORT=3004
# Test x-api-key required for admin operations
TEST_SECRET_KEY=RgFTzJtsfBSLsHiXfBnYcx7xy3N8
#
# Production Environment Variables
#
# Production Database setup
PROD_DB_USERNAME=utility-payments
PROD_DB_PASSWORD=utility@2020
PROD_DB_DATABASE=utilityPayment
PROD_DB_HOST=10.10.150.42
PROD_DB_PORT=3306
# Production server setup
PROD_APP_HOST=10.10.150.42
PROD_APP_PORT=3004
# Production Reverse proxy information
PROD_SERVER_TYPE=http
PROD_SERVER_NAME=10.10.150.42
PROD_PROXY_PORT=3004
# Production x-api-key required for admin operations
PROD_SECRET_KEY=RgFTzJtsfBSLsHiXfBnYcx7xy3N8

' > ./.env

npm install

npm prune

sudo echo '
[Unit]
Description=utility-payments middleware for alizz islamic bank
Documentation=https://gitlab.com/it/node/utility-payments
After=network.target

[Service]
WorkingDirectory=/home/node/utility-payments-0.1.2
User=node
ExecStart=/usr/bin/node server.js
StandardOutput=syslog
StandardError=syslog
Restart=always

[Install]
WantedBy=multi-user.target

' > /lib/systemd/system/utility-payments.service

sudo systemctl daemon-reload

sudo systemctl start utility-payments

sudo systemctl enable utility-payments

