import express from "express";
import cors,{CorsOptions} from "cors";
import { initializeDatabase } from "./db/db.connection.js";
import { config } from "dotenv";

import userRouter from "./routes/user.js"
import adminRouter from "./routes/admin.js"



const app = express();
app.use(express.json());
config();

const corsOptions:CorsOptions= {
  origin:["localhost:5173"],
  credentials:true
}

app.use(cors(corsOptions))

app.use("/api/user",userRouter)
app.use("/api/admin",adminRouter)


initializeDatabase();


const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
