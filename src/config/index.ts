import * as dotenv from "dotenv";
dotenv.config();

const { SECRET_KEY } = process.env;

export { SECRET_KEY };