const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your Express API',
      version: '1.0.0',
      description: 'API documentation for your Express server',
    },
  },
  apis: ['./routes/*.js'], // Path to route files
};

const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;
