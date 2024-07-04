import { User } from "@prisma/client"
import { Request } from "express"

export interface OrderProduct  {
    amount: number
    price: number
    productId: number
}

export interface UserRequest extends Request {
    user?: User
}