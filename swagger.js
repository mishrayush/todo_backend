const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API",
      version: "1.0.0",
      description: "API documentation for Express.js project",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Local Server",
      },
      {
        url: "http://localhost:5000/api",
        description: "Development Server",
      },
      {
        url: "http://localhost:5000/api",
        description: "Production Server",
      }
    ],
  },
  apis: ["./src/modules/**/*.controller.js"], // Point to your controllers
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📄 Swagger Docs available at: http://localhost:5000/api/docs");
};

module.exports = { setupSwagger };
