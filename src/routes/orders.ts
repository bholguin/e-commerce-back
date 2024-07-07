import { Router } from "express";
import { createOrder, deleteOrder, getOrder, getOrders, getUserOrders, updateOrder } from "../modules/order";
import { verifyToken } from "../modules/auth";
import { errorHandler } from "../error-handler";

const router = Router()

/**
 * @swagger
 * components: 
 *   schemas:
 *      OrderProduct:
 *          type: object
 *          properties:
 *              productId:
 *                  type: number
 *                  description: Id del producto
 *              amount:
 *                  type: number
 *                  description: cantidad del producto
 *              price:
 *                  type: number
 *                  description: precio del producto
 *          required:
 *              productId
 *              amount
 *              price
 *      OrderSchema:
 *          type: object
 *          properties:
 *              id:
 *                  type: number
 *                  description: Id de la Orden
 *              createAt:
 *                  type: string
 *                  format: date
 *                  description: Fecha de creacion de la Orden
 *              total:
 *                  type: number
 *                  description: Precio total de la orden
 *              active:
 *                  type: boolean
 *                  description: Estado de la orden
 *              products:
 *                  type: array
 *                  items:
 *                      oneOf:
 *                          - $ref: "#/components/schemas/OrderProduct"
 *          required:
 *              total
 */


router.get("/orders", verifyToken, errorHandler(getOrders))
/**
 * @swagger
 * /api/orders:
 *  get:
 *      security:
 *        - cookieAuth: []
 *      summary: Obtener listado de ordenes
 *      tags:
 *          - Order
 *      responses:
 *          200:
 *              description: {}
 */


router.get("/user-orders", verifyToken, errorHandler(getUserOrders))
/**
 * @swagger
 * /api/user-orders:
 *  get:
 *      summary: Obtener listado de ordenes por usuario
 *      tags:
 *          - Order
 *      responses:
 *          200:
 *              description: {}
 */


router.get("/order/:id", verifyToken, errorHandler(getOrder))
/**
 * @swagger
 * /api/order/{id}:
 *  get:
 *      security:
 *        - cookieAuth: []
 *      summary: Obtener una order por Id
 *      tags:
 *          - Order
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Id de la orden que se desea obtener
 *            schema:
 *              type: number
 *      responses:
 *          200:
 *              description: {}
 *          404:
 *              description: Order not found
 */

router.post("/order", verifyToken, errorHandler(createOrder))
/**
 * @swagger
 * /api/orders:
 *  post:
 *      security:
 *        - cookieAuth: []
 *      summary: Crear una nueva Orden
 *      tags:
 *          - Order
 *      requestBody:
 *          description: Schema de la orden
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/OrderSchema'
 *      responses:
 *          200:
 *              description: {}
 */

router.delete("/order/:id", verifyToken, errorHandler(deleteOrder))
/**
 * @swagger
 * /api/order/{id}:
 *  delete:
 *      security:
 *        - cookieAuth: []
 *      summary: Eliminar una order por Id
 *      tags:
 *          - Order
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Id de la orden que se desea eliminar
 *            schema:
 *              type: number
 *      responses:
 *          200:
 *              description: {}
 *          404:
 *              description: Order not found
 */

router.put("/order/:id", verifyToken, errorHandler(updateOrder))
/**
 * @swagger
 * /api/orders/{id}:
 *  put:
 *      security:
 *        - cookieAuth: []
 *      summary: Actualizar una Orden
 *      tags:
 *          - Order
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Id de la orden que se desea actualizar
 *            schema:
 *              type: number
 *      requestBody:
 *          description: Schema del login
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/OrderSchema'
 *      responses:
 *          200:
 *              description: {}
 */


export default router