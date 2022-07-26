const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/*El servidor vendrá a buscar todas las rutas que empiecen /celebrities al archivo celebrities.routes.js */
const celebritiesRoutes = require("./celebrities.routes.js")
router.use("/celebrities", celebritiesRoutes)

/*El servidor vendrá a buscar todas las rutas que empiecen /movies al archivo movies.routes.js*/
const moviesRoutes = require("./movies.routes.js")
router.use("/movies", moviesRoutes)

module.exports = router;
