import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/root";

export const errorMiddlewares = (error: HttpException, _req: Request, res: Response, _next: NextFunction) => {
    res.status(error.statusCode).json({
        error: error.message,
        errors: error.errors
    })
}