import { chat } from "./socketChat.js";

export const socketModule = (io) => {
  io.on("connection", async (socket) => {
    //saludo
    console.log(`Cliente conectado, id: ${socket.id}`);

    chat(socket, io);
  });
};
