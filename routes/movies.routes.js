//ITERACIÓN 6

const router = require("express").Router();

const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")

//GET "/movies/create" => mostrar un formulario para crear una película
router.get("/create", (req, res, next) => {
    Celebrity.find().select("name")
    .then((listOfCelebrities) =>{
        res.render("./movies/new-movie.hbs", {listOfCelebrities})
    })
    .catch((err)=> {
        next(err)
    })
    
})

//POST "/movies/create" => envía los datos del formulario a esta ruta para crear una película y guardarla en la bd
router.post("/create", (req, res, next) =>{
    //cogemos las propiedades de req.body 
    const {title, genre, plot, cast} = req.body
    //cogemos el modelo Movie y lo utilizamos para añadir el pelicula
    Movie.create({
        title,
        genre,
        plot,
        cast
    })
    .then(()=>{
        res.redirect("/movies")
    })
    .catch((err) =>{
        res.render("./movies/new-movie.hbs")
        next(err)
    }) 
})

//ITERACIÓN 7
//GET "/movies" => mostrar listado de peliculas
router.get("/", (req, res, next) =>{

    Movie.find().select("title")
    .then((listOfMovies) =>{
        res.render("./movies/movies.hbs" , {listOfMovies})
    })
    .catch((err)=>{
        next(err)
    })
})






module.exports = router;