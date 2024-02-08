export class AppError extends Error {
    statusCode = 400;
    constructor(statusCode: number, message: string) {
        super(message)
        this.statusCode = statusCode
        Error.captureStackTrace(this, this.constructor)
    }
}


