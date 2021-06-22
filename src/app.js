const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const xss = require('xss-clean');

const routes = require('./routes/v1');
const { config } = require('./config/config');
const { ApiError } = require('./utils/apiError');
const { httpStatus } = require('./middlewares/response');

const setup = () => {
  const { name, production, port } = config;
  const PORT = process.env.PORT || port;
  const app = express();

  // :: --------- :: => set security HTTP headers
  app.use(helmet());

  // :: --------- :: => parse json request body
  app.use(express.json());

  // :: --------- :: => parse urlencoded request body
  app.use(express.urlencoded({ extended: true }));

  // :: --------- :: => sanitize request data
  app.use(xss());

  // :: --------- :: => gzip compression
  app.use(compression());

  // :: --------- :: => enable cors
  app.use(cors());
  app.options('*', cors());

  // :: --------- :: => api routes
  app.use('/v1', routes);

  // :: --------- :: => send back a 404 error for any unknown api request
  app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'URL Not found'));
  });

  // :: --------- :: => listen
  app.listen(PORT, () => {
    const status = `${production ? 'PRODUCTION' : 'DEVELOPMENT'}`;
    console.log(`[ ${status} ] : ${name} : listening at port ${PORT}`);
  });
};

module.exports = setup;
