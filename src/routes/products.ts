import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../modules/products";
import { verifyToken } from "../modules/auth";
import { errorHandler } from "../error-handler";

const router = Router()

/**
 * @swagger
 * components: 
 *   schemas:
 *      ProductSchema:
 *          type: object
 *          properties:
 *              id:
 *                  type: number
 *                  description: Id de la Orden
 *              name:
 *                  type: string
 *                  description: Nombre del producto
 *              description:
 *                  type: string
 *                  description: Descripcion del producto
 *              price:
 *                  type: number
 *                  description: Precio del producto
 *              stock:
 *                  type: number
 *                  description: Cantidad disponible del producto
 *          required:
 *              name
 *              description
 *              price
 *              stock
 */


router.get("/products", errorHandler(getProducts))
/**
 * @swagger
 * /api/products:
 *  get:
 *      summary: Obtener listado de productos
 *      tags:
 *          - Product
 *      responses:
 *          200:
 *              description: {}
 */

router.get("/products-admin", verifyToken, errorHandler(getProducts))
/**
 * @swagger
 * /api/products-admin:
 *  get:
 *      security:
 *        - cookieAuth: []
 *      summary: Obtener listado de productos para los administradores
 *      tags:
 *          - Product
 *      responses:
 *          200:
 *              description: {}
 */

router.get("/product/:id", errorHandler(getProduct))
/**
 * @swagger
 * /api/product/{id}:
 *  get:
 *      security:
 *        - cookieAuth: []
 *      summary: Obtener un producto por Id
 *      tags:
 *          - Product
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Id del producto que se desea consultar
 *            schema:
 *              type: number
 *      responses:
 *          200:
 *              description: {}
 *          404:
 *              description: product not found
 */

router.post("/product", verifyToken, errorHandler(createProduct))
/**
 * @swagger
 * /api/product:
 *  post:
 *      security:
 *        - cookieAuth: []
 *      summary: Crear un nueva producto
 *      tags:
 *          - Product
 *      requestBody:
 *          description: Schema del producto
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ProductSchema'
 *      responses:
 *          200:
 *              description: {}
 */

router.delete("/product/:id", verifyToken, errorHandler(deleteProduct))
/**
 * @swagger
 * /api/product/{id}:
 *  delete:
 *      security:
 *        - cookieAuth: []
 *      summary: Eliminar un producto por Id
 *      tags:
 *          - Product
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Id del producto que se desea consultar
 *            schema:
 *              type: number
 *      responses:
 *          200:
 *              description: {}
 *          404:
 *              description: product not found
 */

router.put("/product/:id", verifyToken, errorHandler(updateProduct))
/**
 * @swagger
 * /api/product/{id}:
 *  put:
 *      security:
 *        - cookieAuth: []
 *      summary: Actualizar un producto
 *      tags:
 *          - Product
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Id del producto que se desea actualizar
 *            schema:
 *              type: number
 *      requestBody:
 *          description: Schema del login
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ProductSchema'
 *      responses:
 *          200:
 *              description: {}
 */



export default router