import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation API-SCHOOL-TS",
            version: "1.0.0",
            description: "API for managing users"
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ]
    },
    apis: ["./src/routes/*.ts"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
