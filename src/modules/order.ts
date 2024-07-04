import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { OrderProduct } from "../../types"

const prisma = new PrismaClient()

export const getOrders = async (req: Request, res: Response) => {
    const orders = await prisma.order.findMany()
    res.json(orders)
}


export const getOrder = async (req: Request, res: Response) => {
    const order = await prisma.order.findFirst({
        where: {
            id: +req.params.id
        },
        include: {
            products: true
        }
    })

    if (!order) {
        res.status(404).json("Order not found")
    }

    res.json(order)
}

export const createOrder = async (req: Request, res: Response) => {
    const products: Array<OrderProduct> = req.body.products
    const total: number = products.reduce((acc, val) => {
        return acc + (val.amount * +val.price)
    }, 0)

    const order = await prisma.order.create({
        data: {
            total
        }
    })

    products.forEach(async (item) => {
        await prisma.productsOnOrder.create({
            data: {
                productId: item.productId,
                orderId: order.id,
                amount: item.amount
            }
        })
    })

    res.json(order)
}

export const deleteOrder = () => async (req: Request, res: Response) => {
    const product = await prisma.order.delete({
        where: {
            id: +req.params.id
        }
    })

    if (!product) {
        res.status(404).json("Order not found")
    }

    res.json(product)
}

export const updateOrder = async (req: Request, res: Response) => {
    const products: Array<OrderProduct> = req.body.products
    const total: number = products.reduce((acc, val) => {
        return acc + (val.amount * +val.price)
    }, 0)

    const product = await prisma.order.update({
        where: {
            id: +req.params.id
        },
        data: {
            total
        }
    })

    res.json(product)
}