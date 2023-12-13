const express = require('express');
const authRouter = require('./auth');

const indexRouter = express.Router();

indexRouter.use('/', authRouter);

module.exports = indexRouter;
