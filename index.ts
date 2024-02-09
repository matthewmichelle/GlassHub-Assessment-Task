import { createServer } from './src/server';
import config from './src/config';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/utils/swagger';


async function igniteServer() {

    const app = await createServer();

    console.info(`===== ${config.port}`)
    app.listen(config.port, () => {

    }).on("error", (e) => {
        console.log(e)
        process.exit(1)
    })
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

(async function run() {
    await igniteServer()
})();