const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const app = express();

app.listen(3001, console.log("Servidor Levantado en el puerto 3001!"));

// Con callback
// app.listen(3000, () => {
// console.log("Servidor Levantado en el puerto 3000!");
//});

const hola = path.join(__dirname, "hola.html");

app.get("/", (req, res) => {
  res.sendFile(hola);
});

app.get("/services", (req, res) => {
  res.send("Services");
});

app.get("/contact", (req, res) => {
  res.send("Contact");
});

app.get("/staff", (req, res) => {
  res.send("Staff");
});

app.get("/pokemones", async (req, res) => {
  const mensaje = await obtenerPokemon();
  res.send(mensaje);
});

app.get("/guardar_Pokemon", async (req, res) => {
  const pokemones = await obtenerPokemon();
  fs.writeFileSync("pokemones.json", pokemones);
  res.send("Archivo Creado");
});

async function obtenerPokemon() {
  const url = "https://pokeapi.co/api/v2/pokemon";
  let mensaje = "";
  try {
    const response = await axios.get(url);
    const data = JSON.stringify(response.data.results);
    //console.log("contenido de data: ", data);
    mensaje = data;
  } catch (err) {
    mensaje = err;
  }
  return mensaje;
}
