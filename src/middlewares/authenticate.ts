// authenticate.ts
import { Request, Response, NextFunction } from 'express';


export async function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        // Access the userId from the request body
        const { userId } = req.body;

        if (!userId) {
            // If userId is not provided, return 401 Unauthorized status
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // If user is authenticated, call next() to proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If an error occurs, return 500 Internal Server Error status
        console.error('Error authenticating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}
