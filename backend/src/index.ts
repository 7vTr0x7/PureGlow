import express from "express";
import { initializeDatabase } from "./db/db.connection.js";
import { config } from "dotenv";

import userRouter from "./routes/user.js"



const app = express();
app.use(express.json());
config();

initializeDatabase();

app.use("/api/user",userRouter)

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
