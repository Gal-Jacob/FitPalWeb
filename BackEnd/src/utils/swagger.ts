const swaggerUi = require("swagger-ui-express");

import swaggerJSDoc from "swagger-jsdoc";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FitPal API",
      version: "1.0.0",
      description: "API documentation for FitPal",
    },
    servers: [
      {
        url: process.env.BACKEND_URL || "http://localhost:3001",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
