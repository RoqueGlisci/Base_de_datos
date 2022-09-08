import express from "express";

import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";

import ContenedorSQL from "./contenedores/ContenedorSQL.js";

import config from "./config.js";

//--------------------------------------------
// instancio servidor, socket y api

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const productosApi = new ContenedorSQL(config.mariaDb, "articulos");
const mensajesApi = new ContenedorSQL(config.sqlite3, "mensajes");

//--------------------------------------------
// configuro el socket

app.use(express.static("public"));

io.on("connection", async (socket) => {
  const productos = await productosApi.listarAll();
  const messages = await mensajesApi.listarAll();

  socket.emit("messages", messages);
  socket.on("new-message", async (mensajes) => {
    let horaActual = new Date().getHours();
    let minActual = new Date().getMinutes();
    mensajes.hora = horaActual + ":" + minActual;
    messages.push(mensajes);
    await mensajesApi.guardar(mensajes);
    io.sockets.emit("messages", messages);
    await mensajesApi.desconectar();
  });

  //productos
  socket.emit("productos", productos);
  socket.on("new-producto", async (producto) => {
    productos.push(producto);
    await productosApi.guardar(producto);
    io.sockets.emit("productos", productos);
    await productosApi.desconectar();
  });
});

//--------------------------------------------
// agrego middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//--------------------------------------------
// inicio el servidor

const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);
