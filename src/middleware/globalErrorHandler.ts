import { Request, Response, NextFunction } from "express";

export const globalErrorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(error);

    response.status(500).json({
        message: error.message || "Internal server error"
    });
}