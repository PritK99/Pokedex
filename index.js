const express = require('express')
const app = express()
const data = require('./pokedex.json')
const path = require('path')

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/:pokemon_name", (req, res) => {
    const { pokemon_name } = req.params;
    if (pokemon_name) {
        let pokemonFound = false;
        for (let x in data) {
            if (data[x].name.english.toUpperCase() === pokemon_name.toUpperCase()) {
                const myPokemon = data[x];
                pokemonFound = true;
                res.render("pokemon", { myPokemon });
                break; // Add this line to exit the loop upon finding a match
            }
        }
        if (!pokemonFound) {
            console.log("Pokemon not found");
            res.render("notFound", { pokemon_name });
        }
    }
});

app.get("*", () => {
    res.send("Pokedex not working")
})

app.listen(3000, () => {
    console.log("Server listning for activities on port 3000")
})
