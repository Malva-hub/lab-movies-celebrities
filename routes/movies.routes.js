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

//ITERACIÓN 8
//GET "/movies/:id" => mostrar una película específica
router.get("/:movieId", (req, res, next) =>{
    const {movieId} = req.params
    Movie.findById(movieId).populate("cast")
    .then((movieDetails)=>{
        res.render("movies/movie-detail.hbs", {movieDetails})
    })
    .catch((err) =>{
        next(err)
    })
})

//ITERACIÓN 9
//POST "/movies/:movieId/delete" => borrar una película
router.post("/:movieId/delete", async (req, res, next) => {
    try {
        const {movieId} = req.params
        await Movie.findByIdAndDelete(movieId) 
        res.redirect("/movies")
    }catch (err){
        next(err)
    } 
})

//ITERACIÓN 10
//GET "/movies/:movieId/edit" => renderizar un formulario de editar una película
router.get("/:movieId/edit", async (req, res, next)=> {
    try {
        const {movieId} = req.params
        const movieDetails = await Movie.findById(movieId)
        const listOfCelebrities  = await Celebrity.find()
        res.render("movies/edit-movie.hbs", {movieDetails, listOfCelebrities})
    }catch(err){
        next(err)
    }
})

//POST "/movies/:movieId/edit" => recibir la data a editar y actualizar la pelicula en la BD
router.post("/:movieId/edit", (req, res, next) =>{

const {movieId} = req. params
const {title, genre, plot, cast} = req.body 
Movie.findByIdAndUpdate(movieId, {
    title,
    genre,
    plot,
    cast
})
.then ((updateMovie) =>{
    res.redirect(`/movies/${updateMovie._id}`)   
})
.catch((err) => {
    next(err)
})

})



module.exports = router;