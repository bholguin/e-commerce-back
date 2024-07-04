import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import {SECRET_KEY} from "../config"


export const login = (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    if (username === "admin" && password === 123) {
      const token = jwt.sign({ username }, SECRET_KEY as string, { expiresIn: "1h" });
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token not provied" });
  }
  try {
    const payload: any = jwt.verify(token, SECRET_KEY as string);
    req.body.username = payload.username;
    next();
    return 
  } catch (error) {
    return res.status(403).json({ message: "Token not valid" });
  }
}