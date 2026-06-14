import "dotenv/config";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/category.routes";
import storeRoutes from "./routes/store.routes";
import orderRoutes from "./routes/order.routes";
import searchRoutes from "./routes/search.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/search", searchRoutes);

app.get("/", (_, res) => {
  res.json({
    service: "MarketHub Commerce Service",
    status: "running",
  });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.set("io", io);

io.on("connection", (socket) => {

  console.log(
    "Client connected:",
    socket.id
  );

  socket.on(
    "chat-message",
    (message) => {

      console.log(
        "Message:",
        message
      );

      io.emit(
        "chat-message",
        message
      );

    }
  );

  socket.on(
    "disconnect",
    () => {

      console.log(
        "Client disconnected:",
        socket.id
      );

    }
  );

});

const PORT =
  Number(process.env.PORT) || 5000;

server.listen(PORT, () => {

  console.log(
    `Server running on ${PORT}`
  );

});