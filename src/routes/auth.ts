import { Router } from "express"
import { login } from "../modules/auth"
import { errorHandler } from "../error-handler"

const router = Router()

/**
 *@swagger 
 *components:
 *  securitySchemes:
 *    cookieAuth:
 *         type: apikey
 *         in: cookie
 *         name: SessionID
 */

/**
 * @swagger
 * components: 
 *   schemas:
 *      LoginSchema:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *                  description: username del usuario
 *              password:
 *                  type: string
 *                  format: password
 *                  description: password del usuario
 *          required:
 *              username
 *              password
 */

router.post("/login", errorHandler(login))
/**
 * @swagger
 * /api/login:
 *  post:
 *      summary: Crear una nueva Orden
 *      tags:
 *          - Auth
 *      requestBody:
 *          description: Schema de la orden
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LoginSchema'
 *      responses:
 *          200:
 *              description: {}
 */


export default router