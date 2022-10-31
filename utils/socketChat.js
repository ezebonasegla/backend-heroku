import { addMessage, getMessages } from "../controllers/messages.controller.js";

export const chat = (socket, io) => {
  //-----------------------------------------------Chat
  //Muestro mensajes al entrar a la chat
  //-----------------------------------------------
  (async function () {
    const chats = await getMessages();
    io.sockets.emit("messages", [chats.normalizedPosts]);
  })();
  //-----------------------------------------------

  //Agrego mensaje y los muetro en el chat
  //-----------------------------------------------
  socket.on("newMessage", (mensajeDelCliente) => {
    const mensajeDelClienteObjet = JSON.parse(mensajeDelCliente);
    (async function (mensajeDelClienteObjet) {
      await addMessage(mensajeDelClienteObjet);
      (async function () {
        const mensajes = await getMessages();
        io.sockets.emit("messages", mensajes);
      })();
    })(mensajeDelClienteObjet);
  });
};
