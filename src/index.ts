import express from "express"
import cors from "cors"
import swaggerUI from "swagger-ui-express"

import swaggerSpec from "./swagger";
import productRouter from "./routes/products";
import orderRouter from "./routes/orders";

const app = express()
const PORT = 3000;
const ROOT_PATH = "/api"

app.use(cors())
app.use(express.json())

app.use(ROOT_PATH, productRouter)
app.use(ROOT_PATH, orderRouter)

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))