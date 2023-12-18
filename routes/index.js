const express = require('express');
const authRouter = require('./auth');
const verifyToken = require('../middleware/verify-token');
const activitiesRouter = require('./activities');
const tagsRouter = require('./tags');

const indexRouter = express.Router();

indexRouter.use('/', authRouter);
indexRouter.use('/activities', verifyToken, activitiesRouter);
indexRouter.use('/tags', verifyToken, tagsRouter);

module.exports = indexRouter;
