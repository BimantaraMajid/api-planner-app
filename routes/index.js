const express = require('express');
const authRouter = require('./auth');
const verifyToken = require('../middleware/verify-token');
const activitiesRouter = require('./activities');
const tagsRouter = require('./tags');
const plansRouter = require('./plans');

const indexRouter = express.Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/activities', verifyToken, activitiesRouter);
indexRouter.use('/tags', verifyToken, tagsRouter);
indexRouter.use('/plans', verifyToken, plansRouter);

module.exports = indexRouter;
