import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { useRoutes } from "./routes/index";
import bodyParser from "body-parser";
import cors from "cors";

const PORT = process.env.PORT || 8091;

const app = express();
app.use(bodyParser.json());
app.use(cors());
useRoutes(app);

app.listen(PORT, () => console.log("Servidor iniciado na porta " + PORT));