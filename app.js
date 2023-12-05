const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors());

app.use((req, res) => res.status(404).json({ message: 'router not found' }));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port:', port);
});
