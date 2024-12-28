import express from "express";
import { initializeDatabase } from "./db/db.connection.js";
import { config } from "dotenv";

const app = express();
app.use(express.json());
config();

initializeDatabase();

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
