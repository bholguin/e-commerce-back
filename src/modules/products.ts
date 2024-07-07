import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
//import { HttpException } from "../exceptions/root";

const prisma = new PrismaClient()

export const getProducts = async (req: Request, res: Response) => {
    const products = await prisma.product.findMany()
    res.json(products)
}


export const getProduct = async (req: Request, res: Response) => {
    const product = await prisma.product.findFirst({
        where: {
            id: +req.params.id
        }
    })

    if (!product) {
        res.status(404).json("product not found")
    }

    res.json(product)
}

export const createProduct = async (req: Request, res: Response) => {
    const product = await prisma.product.create({
        data: req.body
    })
    res.json(product)
}


export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
 
        const product = await prisma.product.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })

        if (!product) {
            res.status(404).json("product not found")
        }

        res.json(product)
 
}

    export const updateProduct = async (req: Request, res: Response) => {
        const product = await prisma.product.update({
            where: {
                id: +req.params.id
            },
            data: req.body
        })

        res.json(product)
    }