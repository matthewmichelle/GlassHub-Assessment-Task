import express, {Application} from "express";
import load from "./loaders/index";

export function createServer(): Application {
    const app: Application = express();

    load({
        express: app
    })
    
    return app;
}
