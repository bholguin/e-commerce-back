import { Router } from "express";
import { createUser } from "../modules/user";

const router = Router()

/**
 * @swagger
 * components: 
 *   schemas:
 *      UserSchema:
 *          type: object
 *          properties:
 *              id:
 *                  type: number
 *                  description: Id del usuario
 *              firstname:
 *                  type: string
 *                  description: Nombre del usuario
 *              lastname:
 *                  type: string
 *                  description: Lastname del usuario
 *              username:
 *                  type: string
 *                  description: Username del usuario
 *              password:
 *                  type: string
 *                  format: password
 *                  description: Password del usuario
 *              isAdmin:
 *                  type: boolean
 *                  desciption: Tipo de usuario
 *          required:
 *              firstname
 *              lastname
 *              username
 *              password
 */



router.post("/user", createUser)
/**
 * @swagger
 * /api/user:
 *  post:
 *      summary: Crear un nuevo usuario
 *      tags:
 *          - User
 *      requestBody:
 *          description: Schema del usuario
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserSchema'
 *      responses:
 *          200:
 *              description: {}
 */


export default router