import { createServer } from './src/server';
import config from './src/config';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/utils/swagger';
import cors from 'cors' ;

async function igniteServer() {

    const app = await createServer();

    console.info(`===== ${config.port}`)
    app.listen(config.port, () => {

    }).on("error", (e) => {
        console.log(e)
        process.exit(1)
    })
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // to allowed request from locahost just for testing temp ....
    app.use(cors({ origin: 'http://localhost:8081' }));
}

(async function run() {
    await igniteServer()
})();