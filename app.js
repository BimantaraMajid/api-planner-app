if (!process.env.NODE_ENV) {
  console.error('environment not exported');
  process.exit(1);
}

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { default: helmet } = require('helmet');
const { httpSuccess, httpNotFound } = require('./Utils/http-response');
const indexRouter = require('./routes');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());

// request handlers
app.get('/', (req, res) => httpSuccess(res, {
  message: `${process.env.NODE_ENV !== 'production' ? 'staging' : ''} OK`,
}));
app.use('/', indexRouter);
app.use((req, res) => httpNotFound(res, {}, 'Router not found'));

module.exports = app;
