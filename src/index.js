import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import http from "http";
import "dotenv/config";

import { corsOptions } from "./config/corsConfig.js";
import homeRoutes from "./routes/home.js";
import todoRoutes from "./routes/todo.js";

//dotenv.config();
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/", homeRoutes);
app.use("/todo", todoRoutes);

const server = http.createServer(app);

console.log({ env: process.env });
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

console.log("Operativo.");