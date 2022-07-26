//ITERACIÓN 3

const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model")

//GET "/celebrities/create" => mostrar un formulario para crear un famoso
router.get("/create", (req, res, next) => {
    res.render("./celebrities/new-celebrity.hbs")
})

//POST "/celebrities/create" => envía los datos del formulario a esta ruta para crear un famosos y guardarla en la bd
router.post("/create", (req, res, next) =>{
    //cogemos las propiedades de req.body 
    const {name, occupation, catchPhrase} = req.body
    //cogemos el modelo Celebrity y lo utilizamos para añadir el famoso
    Celebrity.create ({
        name,
        occupation,
        catchPhrase
    })
    .then(()=>{
        res.redirect("/celebrities")
    })
    .catch((err) =>{
        res.render("./celebrities/new-celebrity.hbs")
        next(err)
    }) 
})

//ITERACIÓN 4
//GET "/celebrities" => mostrar listado de famosos
router.get("/", (req, res, next) =>{

    Celebrity.find().select("name")
    .then((listOfCelebrities) =>{
        res.render("./celebrities/celebrities.hbs" , {listOfCelebrities})
    })
    .catch((err)=>{
        next(err)
    })
})











module.exports = router;
