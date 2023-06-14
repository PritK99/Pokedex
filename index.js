const express = require('express')
const app = express()
const data = require('./pokedex.json')
const path = require('path')

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

app.get("/", (req, res) => {
    res.render("home");
    return;
});

app.get("/p/:pokemon_name", (req, res) => {
    const { pokemon_name } = req.params;
    if (pokemon_name) {
        let pokemonFound = false;
        for (let x in data) {
            if (data[x].name.english.toUpperCase() === pokemon_name.toUpperCase()) {
                const myPokemon = {
                    name: data[x].name.english,
                    type: data[x].type,
                    HP: data[x].HP,
                    Attack: data[x].Attack,
                    Defense: data[x].Defense,
                    SpAttack: data[x].SpAttack,
                    SpDefense: data[x].SpDefense,
                    Speed: data[x].Speed
                }
                console.log(typeof myPokemon)
                pokemonFound = true;
                res.render("pokemon.ejs", myPokemon);
                break;
            }
        }
        if (!pokemonFound) {
            console.log("Pokemon not found");
            res.render("notFound", { pokemon_name });
        }
    }
    return;
});


app.get("*", () => {
    res.send("Pokedex not working")
})

app.listen(3000, () => {
    console.log("Server listning for activities on port 3000")
})
