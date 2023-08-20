import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chatRouter from "./routes/chatRoutes.js";
dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", chatRouter);

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.listen(port, () => console.log(`Server started on post ${port}`));
