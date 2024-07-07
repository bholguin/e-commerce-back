import { NextFunction, Request, Response } from "express";
import { HttpException } from "./exceptions/root";
import { Prisma } from "@prisma/client";

export const errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next)
        } catch (e: any) {
            console.log(e);
            
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (e.code === 'P2002') {
                    next(new HttpException('There is a unique constraint violation', 400, null))
                } else if (e.code === "P2003") {
                    next(new HttpException("There is relationship!", 400, null))
                }
            } else if(e instanceof HttpException) {
                next(e)
            }else {
                next(new HttpException("Something went wrong!", e.statusCode, null))
            }
        }
    }
}