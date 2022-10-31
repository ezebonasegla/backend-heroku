import { schema, normalize } from "normalizr";

//Mapeo el array de mensajes armar el objeto con el formato que queremos y eliminar el object_id de mongoose
const depurarChat = (msj) => {
  const infodepurada = { id: "999", chats: [] };
  msj.map((item) => {
    infodepurada.chats.push({
      id: item.id,
      author: item.author,
      text: item.text,
      date: item.date,
    });
  });
  return infodepurada;
};

//Normalizo los chat
export const normalizeMensajes = (msj) => {
  //depuro y foramteo el char el chat
  const chatDepurado = depurarChat(msj);
  //Creo las entidades
  const user = new schema.Entity("users");
  const mensajes = new schema.Entity("mensajes", {
    author: user,
  });
  const chats = new schema.Entity("chats", { chats: [mensajes] });
  //
  const normalizedPosts = normalize(chatDepurado, chats);

  //Normalizo el chat
  const respuesta = {
    normalizedPosts: normalizedPosts,
  };
  return respuesta;
};
