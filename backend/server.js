import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chatRouter from "./routes/chatRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { auth } from "express-oauth2-jwt-bearer";
import sequelize from "./config/db.js";
dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER,
  tokenSigningAlg: process.env.AUTH0_ALG,
});

app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

app.get("/", (req, res) => {
  res.send("API is running....");
});

sequelize.sync({ alter: true });

app.listen(port, () => console.log(`Server started on post ${port}`));
