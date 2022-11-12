const socket = io();
import { desnormalizar } from "./funciones.js";

//Chat

//Socket Chat
socket.on("messages", (chats) => {
  const chatDesnormalizado = desnormalizar(chats[0]);
  const divMsj = document.getElementById("messages");
  const add = chatDesnormalizado.chats
    .map((chat) => {
      return `
    <p>
    <span style="color: blue;">${chat.author.id}</span>
    <span style="color: brown;">[${chat.date}]: </span>
    <span style="color: green;">${chat.text}</span>
    <img class='avatar' src='${chat.author.avatar}'></img>
    </p>
    `;
    })
    .join(" ");
  divMsj.innerHTML = add;
});

//Boton send msg
const boton = document.getElementById("send");
boton.addEventListener("click", (e) => {
  const id = document.getElementById("id").value;
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const edad = document.getElementById("edad").value;
  const alias = document.getElementById("alias").value;
  const avatar = document.getElementById("avatar").value;
  const text = document.getElementById("text").value;
  const date =
    new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();

  const msjToSend = {
    author: {
      id,
      nombre,
      apellido,
      edad,
      alias,
      avatar,
    },
    text,
    date,
  };
  socket.emit("newMessage", JSON.stringify(msjToSend));
});

//Productos

const tabla = document.getElementById("tablaProductos");

fetch("/api/productos")
  .then((res) => res.json())
  .then((productos) => {
    const add = productos
      .map((producto) => {
        return `
    <tr>
    <td>${producto.title}</td>
    <td>${producto.description}</td>
    <td>${producto.code}</td>
    <td>${producto.price}</td>
    <td><img src=${producto.thumbnail} alt=${producto.title}></td>
    <td>${producto.stock}</td>
    </tr>
    `;
      })
      .join(" ");
    tabla.innerHTML = add;
  });






/* fetch("/api/productos-test")
  .then((res) => {
    return res.json();
  })
  .then((datos) => {
    const add = datos
      .map((dato) => {
        return `<tr>
    <td>${dato.nombre}</td>
    <td>${dato.precio}</td>
    <td>${dato.stock}</td>
    <td><img src=${dato.foto} alt=${dato.nombre}></td>
  </tr>`;
      })
      .join(" ");

    tabla.innerHTML = add;
  }); */
