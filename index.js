const express = require('express')
const app = express()
const data = require('./pokedex.json')
const path = require('path')
const fs = require('fs')

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

app.use(express.static(path.join(__dirname, "/public")))

app.get("/", (req, res) => {
    res.locals.title = "Home"
    res.render("home");
    return;
});

app.post("/", (req, res) => {

    const file = fs.readFileSync('pokedex.json')
    console.log(req.body)
    const {englishname, type, description} = req.body

    const name = {english : englishname}

    const json = JSON.parse(file.toString());
    json.push({ name, type, description });
    fs.writeFileSync("pokedex.json", JSON.stringify(json));

    res.send("Pokemon added")
})

app.get("/p/custom", (req,res) => {
    res.locals.title = "Customize"
    res.render("custom/index")
})

app.get("/p/:pokemon_name", (req, res) => {
    const { pokemon_name } = req.params;
    if (pokemon_name) {
        let pokemonFound = false;
        for (let x in data) {
            if (data[x].name.english.toUpperCase() === pokemon_name.toUpperCase()) {
                res.locals.title = data[x].name.english
                const myPokemon = {
                    name: data[x].name.english,
                    type: data[x].type,
                    // HP: data[x].HP,
                    // Attack: data[x].Attack,
                    // Defense: data[x].Defense,
                    // SpAttack: data[x].SpAttack,
                    // SpDefense: data[x].SpDefense,
                    // Speed: data[x].Speed,
                    imgURL: data[x].image.hires,
                    description: data[x].description
                }
                pokemonFound = true;
                res.render("pokemon.ejs", myPokemon);
                break;
            }
        }
        if (!pokemonFound) {
            res.locals.title = "Not Found"
            console.log("Pokemon not found");
            res.render("notFound", { pokemon_name });
        }
    }
    return;
});


app.get("*", (req, res) => {
    res.locals.title = "Invalid URL"
    res.render("invalid")
})

app.listen(3000, () => {
    console.log("Server listning for activities on port 3000")
})
