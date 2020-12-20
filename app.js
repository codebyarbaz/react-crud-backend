require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const app = express();

// app.use(helmet());
app.use(express.static('public'));

// CORS
app.use(function (req, res, next) {
  const origin = req.headers.origin;

  if (process.env.WHITELIST_DOMAINS.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, Authorization, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.disable('X-Powered-By');
app.use(cookieParser());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./db/dbConfig');

const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const cardRouter = require('./routes/cardRouter');

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/card', cardRouter);

app.listen(process.env.PORT, () => {
  db.connect();
  console.log(
    `The server is started and listening to port ${process.env.PORT}!`
  );
});
