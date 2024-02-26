const express = require("express");
const data = require("./data.json"); // Importing data.json directly
const path = require("path");
const fs = require("fs");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/data", (req, res) => {
  fs.readFile("data.json", "utf8", (err, fileData) => {
    try {
      const jsonData = JSON.parse(fileData);
      res.send(jsonData);
    } catch (error) {
      console.error(error);
    }
  });
});

app.get("/api/data/:id", (req, res) => {
  const pokemonId = parseInt(req.params.id);

  fs.readFile("data.json", "utf8", (err, fileData) => {
    try {
      const jsonData = JSON.parse(fileData);
      const selectedPokemon = jsonData.find(
        (pokemon) => pokemon.id === pokemonId
      );

      res.send(selectedPokemon);
    } catch (error) {
      console.error(error);
    }
  });
});

app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));
