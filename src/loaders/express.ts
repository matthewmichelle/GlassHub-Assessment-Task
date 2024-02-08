// import helmet from 'helmet';
import httpStatus from 'http-status';
import express, { Application, Request, Response, NextFunction } from 'express';
import { AwilixContainer } from 'awilix'
import { loadControllers, scopePerRequest } from 'awilix-express';
import * as path from 'path';
import { errorConverter, errorHandler } from '../middlewares/error'
import { AppError } from '../utils/AppError';

export function loadExpress(app: Application, di_container: AwilixContainer) {
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }));
   // app.use(helmet());

    // register routes handler

    app.use(scopePerRequest(di_container)) // define scoped services
    console.log("di_container" ,`${path.resolve()}/src/controllers/*.ts`)
    app.use(loadControllers(`${path.resolve()}/src/controllers/*.ts`));


    // error handler
    app.use((req, res, next) => {
        next(new AppError(httpStatus.NOT_FOUND, 'Not found'))
    })

    // convert error to AppError, if needed
    app.use(errorConverter)

    // handle error
    app.use(errorHandler)
}