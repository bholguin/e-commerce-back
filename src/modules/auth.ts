import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'
import { SECRET_KEY } from "../config"
import { PrismaClient } from '@prisma/client';
import { UserRequest } from '../../types';
import { decrypt } from '../helpers/encrypt-helper';

const prisma = new PrismaClient()

interface JwtPayloadWithId extends JwtPayload {
  id?: number
}

export const login = async (req: Request, res: Response) => {
  try {

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await prisma.user.findFirst({ where: { username: username } })
    const pass = decrypt(user?.password as string)
    console.log(pass);
    
    if (username === user?.username && password === pass) {
      const token = jwt.sign({ id: user?.id }, SECRET_KEY as string, { expiresIn: "1h" });
      let options: any = {
        maxAge: 20 * 60 * 1000, // would expire in 20minutes
        httpOnly: true, // The cookie is only accessible by the web server
        secure: true,
        sameSite: "None",
      };
      res.cookie("SessionID", token, options);
      return res.status(200).json("Success login");
    } else {
      return res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const verifyToken = async(req: UserRequest, res: Response, next: NextFunction) => {
  const header = req.header("cookie") || "";
  const token = header?.split("=")[1];  
  console.log(token);
  
  if (!token) {
    return res.status(401).json({ message: "Token not provied" });
  }

  try {
    jwt.verify(token, SECRET_KEY as string, async (err, decoded) => {

      if (err) {
        // if token has been altered or has expired, return an unauthorized error
        return res
          .status(401)
          .json({ message: "This session has expired. Please login" });
      }

      const { id } = decoded as JwtPayloadWithId // get user id from the decoded token
      const user = await prisma.user.findFirst({ where: { id: id } })
      if(user){
        req.user = {
          ...user,
          password: ""
        }; // put the data object into req.user 
      }
      next();
      return
    });
  } catch (error) {
    return res.status(403).json({ message: "Token not valid" });
  }

  return
}
