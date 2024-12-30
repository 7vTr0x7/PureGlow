import express from "express";
import { initializeDatabase } from "./db/db.connection.js";
import { config } from "dotenv";

import userRouter from "./routes/user.js"
import adminRouter from "./routes/admin.js"



const app = express();
app.use(express.json());
config();

initializeDatabase();

app.use("/api/user",userRouter)
app.use("/api/admin",adminRouter)

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
