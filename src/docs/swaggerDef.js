const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'File storage system API documentation',
    version,
    license: {
      name: '',
      url: '',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
    {
      url: 'https://file-storage-backend.herokuapp.com/v1',
    },
  ],
};

module.exports = swaggerDef;
