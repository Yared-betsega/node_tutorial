const express = require("express")
const Joi = require('joi');

const router = express.Router();

const genres = [
    {id:1, name:"The avengers", genre: "Action"},
    {id:2, name:"The Notebook", genre: "Romance"},
    {id:3, name:"Rush hour", genre: "Comedy"},
    {id:4, name:"Journey to the center of the earth", genre: "Adventure"}
]
router.get("/", (req, res) => {
    res.send(genres);
})

router.get("/:id", (req, res) => {
    const genre = genre.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("A genre with the given Id was not found");
    res.send(genre);
})

router.post("/", (req, res) => {
    
    const{ error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name,
        genre: req.body.genre
    }
    genres.push(genre)
    res.send(genre);
})

router.put("/:id", (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("A genre with the given Id was not found");
    
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    genre.name = req.body.name || genre.name
    genre.genre = req.body.genre || genre.genre
    res.send(genre);
 
})

router.delete("/:id", (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("A genre with the given Id was not found");

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});

function validateGenre(movie){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        genre:Joi.string().min(3).required()
    });
    return schema.validate(movie);
}

module.exports = router;