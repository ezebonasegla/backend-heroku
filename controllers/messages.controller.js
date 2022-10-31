import { normalizeMensajes } from "../utils/normalizeData.js";

import { MensajesDAOFirebase } from "../daos/mensajes/MensajesDAOFirebase.js";

const storage = new MensajesDAOFirebase();

export const getMessages = async () => {
  try {
    const mensajes = await storage.getAll();
    return normalizeMensajes(mensajes);
  } catch (error) {
    throw new Error(error);
  }
};

export const addMessage = async (Mssg) => {
  try {
    const mensaje = {
      id: Math.random().toString(36).slice(2),
      author: {
        id: Mssg.author.id,
        nombre: Mssg.author.nombre,
        apellido: Mssg.author.apellido,
        edad: Mssg.author.edad,
        alias: Mssg.author.alias,
        avatar: Mssg.author.avatar,
      },
      text: Mssg.text,
      date: Mssg.date,
    };
    await storage.save(mensaje);
  } catch (error) {
    throw new Error(error);
  }
};





/* export class MessagesController {
  constructor(archivo) {
    this.archivo = archivo;
  }

  //obtener chat
  async getAll() {
    try {
      //Consulto a la bbdd
      const mensajes = await Mensaje.find({});
      const mensajesReverse = mensajes.reverse();
      //Normalizo el char
      const info = normalizeMensajes(mensajesReverse);
      //retorno
      return info;
    } catch (err) {
      return { error: err };
    }
  }

  async addMessage(Mssg) {
    try {
      //guardo el archivo
      const mensajesNuevo = new Mensaje({
        id: Math.random().toString(36).slice(2),
        author: {
          id: Mssg.author.id,
          nombre: Mssg.author.nombre,
          apellido: Mssg.author.apellido,
          edad: Mssg.author.edad,
          alias: Mssg.author.alias,
          avatar: Mssg.author.avatar,
        },
        text: Mssg.text,
        date: Mssg.date,
      });
      const Guardado = await mensajesNuevo.save();

      //retorno
      if (!Guardado) {
        throw new Error("Error al guardar");
      }
    } catch (err) {
      console.log("error en model: " + err);
    }
  }
} */
