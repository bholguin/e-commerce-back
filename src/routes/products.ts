import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../modules/products";
import { verifyToken } from "../modules/auth";

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


router.get("/products", getProducts)
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

router.get("/products-admin", verifyToken, getProducts)
/**
 * @swagger
 * /api/products-admin:
 *  get:
 *      summary: Obtener listado de productos para los administradores
 *      tags:
 *          - Product
 *      responses:
 *          200:
 *              description: {}
 */

router.get("/product/:id", getProduct)
/**
 * @swagger
 * /api/product/{id}:
 *  get:
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

router.post("/product", verifyToken, createProduct)
/**
 * @swagger
 * /api/product:
 *  post:
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

router.delete("/product/:id", verifyToken, deleteProduct)
/**
 * @swagger
 * /api/product/{id}:
 *  delete:
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

router.put("/product/:id", verifyToken, updateProduct)
/**
 * @swagger
 * /api/product/{id}:
 *  put:
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