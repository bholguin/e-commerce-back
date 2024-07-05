import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import { encrypt } from "../helpers/encrypt-helper"
import { UserRequest } from "../../types"

const prisma = new PrismaClient()

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    let pass = req.body.password
    const user = await prisma.user.create({
        data: {
            ...req.body,
            password: encrypt(pass)
        }
    })
    res.json(user)
}

export const getUser = async (req: UserRequest, res: Response) => res.json(req.user)
