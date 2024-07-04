import express from "express"
import cors from "cors"
import swaggerUI from "swagger-ui-express"
import cookieParser from "cookie-parser";

import swaggerSpec from "./swagger";
import loginRouter from './routes/auth';
import productRouter from "./routes/products";
import orderRouter from "./routes/orders";


const app = express()
const PORT = 3000;

const ROOT_PATH = "/api"

app.use(cors())
app.disable("x-powered-by"); //Reduce fingerprinting
app.use(cookieParser());
app.use(express.json())

app.use(ROOT_PATH, loginRouter)
app.use(ROOT_PATH, productRouter)
app.use(ROOT_PATH, orderRouter)

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))