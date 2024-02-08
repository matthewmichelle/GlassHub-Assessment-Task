import httpStatus from 'http-status'
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError'
import config from '../config';

const errorConverter = async (error: AppError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
    const message = error.message || httpStatus[statusCode] as string
    error = new AppError(statusCode, message)
    next(error)
}

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const { message, statusCode } = err
    const response = {
        error: true,
        code: statusCode,
        message,
        ...(config.env !== 'production' && { stack: err.stack }),
    }

    res.status(statusCode).send(response)
}

export { errorConverter, errorHandler }