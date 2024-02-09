import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Images API',
            version: '1.0.0',
            description: 'API documentation for the Images',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Update with your server URL
            },
        ],
    },
    apis: ['**/*.ts'], // Update with the path to your ImageController
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
