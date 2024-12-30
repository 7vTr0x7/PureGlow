import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { initializeDatabase } from "./db/db.connection.js";
import cors from "cors";
import adminRoutes from "./routes/admin.js";
import userRoutes from "./routes/user.js";
import cookieParser from "cookie-parser";

const app = express();
const httpServer = createServer(app);

const corsOptions = {
  origin: ["https://elysian-frontend-three.vercel.app"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

const io = new Server(httpServer, {
  cors: {
    origin: "https://elysian-frontend-three.vercel.app",
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

app.set("io", io);

app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

initializeDatabase();

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("UserUpdated", () => {
    console.log("Data updated event received from client");
    io.emit("UserUpdated");
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
