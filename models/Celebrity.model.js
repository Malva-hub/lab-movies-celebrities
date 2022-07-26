//ITERACIÓN 2
const {Schema, model} = require("mongoose") 

const celebritySchema = new Schema (
    {
        name: String, 
        occupation: String,
        catchPhrase: String
    },
    {
        timestamps: true  //para mostrar fecha de creación y modificación
    }
)


const Celebrity = model ("Celebrity", celebritySchema)
module.exports = Celebrity