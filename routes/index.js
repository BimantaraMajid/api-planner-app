const express = require('express');
const authRouter = require('./auth');
const activitiesRouter = require('./activities');
const verifyToken = require('../middleware/verify-token');

const indexRouter = express.Router();

indexRouter.use('/', authRouter);
indexRouter.use('/activities', verifyToken, activitiesRouter);

module.exports = indexRouter;
