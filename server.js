const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// Static Files
app.use(express.static("public"));

// Main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Query all data
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

// Query a specific object
app.get("/api/data/:id", (req, res) => {
  // Parse the ID to int for comparison
  const pokemonId = parseInt(req.params.id);

  fs.readFile("data.json", "utf8", (err, fileData) => {
    try {
      const jsonData = JSON.parse(fileData);
      // Find the matching Pokemon according to the ID
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
