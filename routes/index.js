const express = require('express');
const authRouter = require('./auth');
const verifyToken = require('../middleware/verify-token');
const activitiesRouter = require('./activities');
const tagsRouter = require('./tags');
const plansRouter = require('./plans');
const notesRouter = require('./notes');
const { authLimiter } = require('../Utils/rate-limit-request');

const indexRouter = express.Router();

indexRouter.use('/auth', authLimiter, authRouter);
indexRouter.use('/activities', verifyToken, activitiesRouter);
indexRouter.use('/tags', verifyToken, tagsRouter);
indexRouter.use('/plans', verifyToken, plansRouter);
indexRouter.use('/notes', verifyToken, notesRouter);

module.exports = indexRouter;
